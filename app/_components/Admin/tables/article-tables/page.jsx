"use client";

import Image from "next/image";
import { MoreDotIcon } from "@/app/_icons";
import { Dropdown } from "@/app/_components/Admin/ui/dropdown/Dropdown";
import { DropdownItem } from "@/app/_components/Admin/ui/dropdown/DropdownItem";
import React, { useEffect, useState } from "react";
import {
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    Table,
} from "@/app/_components/Admin/ui/table";
import Badge from "@/app/_components/Admin/ui/badge/Badge";
import { deleteArticle, getArticles } from "@/app/_services/articleService";
import { useModal } from "@/app/_hooks/useModal";
import ArticleModal from "@/app/_components/Admin/modal/article-modal/page";


export default function ArticleTable() {
    const [articleItems, setArticleItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [modalMode, setModalMode] = useState("edit");
    const { isOpen, openModal, closeModal } = useModal();

    const fetchArticlesData = async () => {
        setIsLoading(true);
        try {
            const data = await getArticles(1, 9);
            setArticleItems(data || []);
        } catch (error) {
            console.error("Error fetching article data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticlesData();
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    const closeDropdown = () => {
        setOpenDropdownId(null);
    };

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Yakin ingin menghapus artikel ini?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await deleteArticle(id, token);

            closeDropdown();
            alert("Artikel berhasil dihapus.");
            fetchArticlesData();
        } catch (error) {
            console.error("Gagal menghapus artikel:", error);
            alert("Terjadi kesalahan saat menghapus artikel.");
        }
    };

    const openEditModal = (item) => {
        setSelectedArticle(item);
        setModalMode("edit");
        openModal();
    };

    const openViewModal = (item) => {
        setSelectedArticle(item);
        setModalMode("view");
        openModal();
    };

    const handleSave = () => {
        console.log("Saving changes...");
        closeModal();
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-fit">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Title
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {articleItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="max-w-full me-2 bg-pink-600  overflow-hidden ">
                                                <Image
                                                    width={100}
                                                    height={80}
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`}
                                                    alt={item.title}
                                                />
                                            </div>
                                            <div>
                        <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">
                          {item.title}
                        </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {item.author}
                        </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-start">
                                        <Badge
                                            size="sm"
                                            color={
                                                item.status === "published"
                                                    ? "success"
                                                    : item.status === "draft"
                                                        ? "warning"
                                                        : "error"
                                            }
                                        >
                                            {item.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-start">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => toggleDropdown(item.id)}
                                                className="dropdown-toggle"
                                            >
                                                <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                                            </button>
                                            <Dropdown
                                                isOpen={openDropdownId === item.id}
                                                onClose={closeDropdown}
                                                className="w-40 p-2"
                                            >
                                                <DropdownItem
                                                    onItemClick={() => openViewModal(item)}
                                                    className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                >
                                                    Detail
                                                </DropdownItem>
                                                <DropdownItem
                                                    onItemClick={() => openEditModal(item)}
                                                    className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    onItemClick={() => handleDelete(item.id)}
                                                    className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                >
                                                    Delete
                                                </DropdownItem>
                                            </Dropdown>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <ArticleModal
                isOpen={isOpen}
                onClose={closeModal}
                item={selectedArticle}
                onSave={handleSave}
                mode={modalMode}
            />
        </div>
    );
}
