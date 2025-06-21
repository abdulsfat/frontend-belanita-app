"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/app/_components/Admin/ui/modal";
import Label from "@/app/_components/Form/Label";
import Input from "@/app/_components/Form/input/InputField";
import Button from "@/app/_components/Admin/ui/button/Button";
import DropZone from "@/app/_components/Form/form-elements/DropZone";
import TextArea from "@/app/_components/Form/input/TextArea";
import Select from "@/app/_components/Form/Select";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";

export default function CreateMerchModal({ isOpen, onClose, showToast }) {
    const { createMerchandise, fetchMerchandises, fetchCategories, categories } = useMerchandiseStore();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        merchandise_category_id: "",
        image: null,
    });

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (file) => {
        setFormData((prev) => ({ ...prev, image: file }));
    };

    const handleSelectCategory = (val) => {
        setFormData((prev) => ({
            ...prev,
            merchandise_category_id: val,
        }));
    };


    const handleReset = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
            merchandise_category_id: "",
            image: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, description, price, stock, merchandise_category_id } = formData;
        if (!name || !description || !price || !stock || !merchandise_category_id) {
            showToast("Semua field wajib diisi", "error");
            return;
        }

        const payload = new FormData();
        payload.append("name", name);
        payload.append("description", description);
        payload.append("price", price);
        payload.append("stock", stock);
        payload.append("merchandise_category_id", merchandise_category_id);
        if (formData.image) {
            payload.append("image", formData.image);
        }

        try {
            for (let pair of payload.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            await createMerchandise(payload);
            await fetchMerchandises();

            showToast("Merchandise berhasil dibuat!", "success");

            onClose();
            handleReset();
        } catch (err) {
            console.error(err);
            showToast("Terjadi kesalahan saat membuat merchandise.", "error");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Form Create Merchandise
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Create your merchandise
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-6">
                            <DropZone  onFileSelect={handleFileSelect} />

                            <div>
                                <Label>Name Product</Label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                                <div className="col-span-2">
                                    <Label>Category</Label>
                                    <Select
                                        value={formData.merchandise_category_id}
                                        onChange={handleSelectCategory}
                                        options={categories?.map((cat) => ({
                                            label: cat.name,
                                            value: cat.id,
                                        }))}
                                        placeholder="Select Category"
                                    />

                                </div>
                            </div>

                            <div>
                                <Label>Description Product</Label>
                                <TextArea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Create Description Product"
                                    required
                                />
                            </div>

                            <div>
                                <Label>Stock</Label>
                                <Input
                                    name="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="200"
                                    required
                                />
                            </div>

                            <div>
                                <Label>Price</Label>
                                <Input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="200000"
                                    required
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
                            Create Merchandise
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
