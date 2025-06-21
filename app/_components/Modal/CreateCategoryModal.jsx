"use client";

import { useState } from "react";
import { Modal } from "@/app/_components/Admin/ui/modal";
import Label from "@/app/_components/Form/Label";
import Input from "@/app/_components/Form/input/InputField";
import Button from "@/app/_components/Admin/ui/button/Button";
import Switch from "@/app/_components/Form/switch/Switch";
import DropZone from "@/app/_components/Form/form-elements/DropZone";
import TextArea from "@/app/_components/Form/input/TextArea";
import useArticleStore from "@/app/_stores/articleStore";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";

export default function CreateCategoryModal({ isOpen, onClose, showToast }) {
    const { fetchCategories, createCategory } = useMerchandiseStore();


    const [formData, setFormData] = useState({
        name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            showToast("Nama kategori tidak boleh kosong", "error");
            return;
        }

        try {
            const payload = new FormData();
            payload.append("name", formData.name.trim());

            await createCategory(payload);

            await fetchCategories();

            showToast("Category berhasil dibuat!", "success");
            onClose();
            handleReset();
        } catch (error) {
            console.error(error);
            showToast("Terjadi kesalahan saat membuat Category.", "error");
        }
    };

    const handleReset = () => {
        setFormData({
            name: "",
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Form Create Category
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Create your category here. You can add a name.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-6">

                            <div>
                                <Label>Nama Kategori</Label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Apparel"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button type="button" size="sm" variant="outline" onClick={(e) => {
                            e.preventDefault();
                            handleReset();
                        }}>
                            Reset
                        </Button>
                        <Button type="submit" size="sm">
                            Create Category
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
