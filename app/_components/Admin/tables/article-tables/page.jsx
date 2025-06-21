"use client";

import Image from "next/image";
import Badge from "@/app/_components/Admin/ui/badge/Badge";
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
import { useRouter } from "next/navigation";
import { EllipsisVertical } from "lucide-react";
import useToastStore from "@/app/_stores/toastStore";
import useArticleStore from "@/app/_stores/articleStore";

export default function ArticleTable() {
    const router = useRouter();
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const { showToast } = useToastStore();
    const { deleteArticle, articles } = useArticleStore();


    useEffect(() => {
        if (confirmDeleteId !== null) {
            const timeout = setTimeout(() => {
                setConfirmDeleteId(null);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [confirmDeleteId]);

    const toggleDropdown = (id) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    const closeDropdown = () => {
        setOpenDropdownId(null);
    };

    const handleDelete = async (id) => {
        if (confirmDeleteId !== id) {
            setConfirmDeleteId(id);
            showToast("Klik lagi untuk konfirmasi hapus", "error");
            return;
        }

        try {
            await deleteArticle(id);
            showToast("Artikel berhasil dihapus", "success");
        } catch (error) {
            showToast("Terjadi kesalahan saat menghapus artikel", "error");
        } finally {
            setConfirmDeleteId(null);
            closeDropdown();
        }
    };


    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-fit">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Title</TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Action</TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {articles.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="max-w-full me-2 overflow-hidden">
                                                <Image
                                                    width={100}
                                                    height={80}
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`}
                                                    alt={item.title}
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.title}</span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{item.author}</span>
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
                                                <EllipsisVertical className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                                            </button>
                                            <Dropdown
                                                isOpen={openDropdownId === item.id}
                                                onClose={closeDropdown}
                                                className="w-40 p-2"
                                            >
                                                <DropdownItem
                                                    onItemClick={() => router.push(`/dashboard/articles/detail/${item.slug}`)}
                                                    className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                >
                                                    Detail
                                                </DropdownItem>

                                                <DropdownItem
                                                    onItemClick={() => router.push(`/dashboard/articles/edit/${item.slug}`)}
                                                    className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    onItemClick={() => handleDelete(item.id)}
                                                    className="flex w-full font-normal text-left text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-white/5 dark:hover:text-red-400"
                                                >
                                                    {confirmDeleteId === item.id ? "Klik lagi untuk hapus" : "Delete"}
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
        </div>
    );
}
