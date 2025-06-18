"use client";

import {useState} from "react";
import {Modal} from "@/app/_components/Admin/ui/modal";
import Label from "@/app/_components/Form/Label";
import Input from "@/app/_components/Form/input/InputField";
import Button from "@/app/_components/Admin/ui/button/Button";
import Switch from "@/app/_components/Form/switch/Switch";
import DropZone from "@/app/_components/Form/form-elements/DropZone";
import TextArea from "@/app/_components/Form/input/TextArea";
import {createArticles, getArticles} from "@/app/_services/articleService";
import useArticleStore from "@/app/_stores/articleStore";

export default function CreateArticleModal({isOpen, onClose, onSuccess, token, showToast}) {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        status: "draft",
        image: null,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSwitchChange = (checked) => {
        setFormData((prev) => ({
            ...prev,
            status: checked ? "published" : "draft",
        }));
    };

    const handleFileSelect = (file) => {
        setFormData((prev) => ({...prev, image: file}));
    };

    const { setArticles } = useArticleStore();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            showToast("Judul dan konten tidak boleh kosong", "error");
            return;
        }

        try {
            const payload = new FormData();
            payload.append("title", formData.title.trim());
            payload.append("content", formData.content.trim());
            payload.append("status", formData.status);
            if (formData.image) {
                payload.append("image", formData.image);
            }

            await createArticles(token, payload);

            const updatedArticles = await getArticles();
            setArticles(updatedArticles);

            showToast("Artikel berhasil dibuat!", "success");
            onClose();
            handleReset();
        } catch (error) {
            showToast("Terjadi kesalahan saat membuat artikel.", "error");
        }
    };

    const handleReset = () => {
        setFormData({
            title: "",
            content: "",
            status: "draft",
            image: null,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div
                className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Create Article
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Create your article
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-6">
                            <DropZone onFileSelect={handleFileSelect}/>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                                <Switch
                                    label={formData.status === "published" ? "Published" : "Draft"}
                                    defaultChecked={formData.status === "published"}
                                    onChange={handleSwitchChange}
                                />
                            </div>

                            <div>
                                <Label>Title</Label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Article title"
                                />
                            </div>

                            <div>
                                <Label>Content</Label>
                                <TextArea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Article content"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button type="button" size="sm" variant="outline" onClick={(e) => {
                            e.preventDefault();
                            handleReset();
                        }}
                        >
                            Reset
                        </Button>
                        <Button type="submit" size="sm">
                            Create Article
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
