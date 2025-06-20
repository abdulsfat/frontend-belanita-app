"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/app/_components/Admin/ui/modal";
import Label from "@/app/_components/Form/Label";
import Input from "@/app/_components/Form/input/InputField";
import Button from "@/app/_components/Admin/ui/button/Button";
import DropZone from "@/app/_components/Form/form-elements/DropZone";
import TextArea from "@/app/_components/Form/input/TextArea";
import { createMerch, getCategories } from "@/app/_services/merchService";

export default function CreateMerchandiseModal({ isOpen, onClose, token, showToast }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    stock: 0,
    price: 0,
    description: "",
    merchandise_categories_id: 0,
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        console.log("Kategori berhasil diambil:", categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.stock.trim() || !formData.price.trim() || !formData.description.trim() || !formData.merchandise_categories_id.trim()) {
      showToast("Nama produk tidak boleh kosong", "error");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("stock", formData.stock.trim());
      payload.append("price", formData.price.trim());
      payload.append("description", formData.description.trim());
      payload.append("merchandise_categories_id", formData.merchandise_categories_id.trim());
      if (formData.image) {
        payload.append("image", formData.image);
      }

      await createMerch(token, payload);

      showToast("Merchandise berhasil dibuat!", "success");
      onClose();
      handleReset();
      window.location.reload();
    } catch (error) {
      console.error("Gagal menyimpan merchandise:", error);
      showToast("Terjadi kesalahan saat membuat merchandise.", "error");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      stock: 0,
      price: 0,
      description: "",
      merchandise_categories_id: 0,
      image: null,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Create Merchandise</h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">Create your merchandise</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-6">
              <DropZone onFileSelect={handleFileSelect} />

              <div>
                <Label>Product Name</Label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Merchandise title" />
              </div>
              <div>
                <Label>Stock</Label>
                <Input name="stock" value={formData.stock} onChange={handleChange} placeholder="Merchandise stock" />
              </div>
              <div>
                <Label>Price</Label>
                <Input name="price" value={formData.price} onChange={handleChange} placeholder="Merchandise price" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  name="category"
                  value={formData.merchandise_categories_id}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 mt-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  {categories.map((category) => {
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>;
                  })}
                </select>
              </div>
              <div>
                <Label>Description</Label>
                <TextArea name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Merchandise description" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
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
