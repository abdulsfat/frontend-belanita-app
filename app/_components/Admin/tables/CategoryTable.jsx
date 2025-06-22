"use client";

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

import {EllipsisVertical, Trash} from "lucide-react";
import moment from "moment";
import useToastStore from "@/app/_stores/toastStore";
import CustomToast from "@/app/_components/Toast/CustomToast";
import useEmergencyStore from "@/app/_stores/emergencyStore";
import useAuthStore from "@/app/_stores/authStore";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";
import {useRouter} from "next/navigation";

export default function CategoryTable() {
    const { categories, fetchCategories, deleteCategories } = useMerchandiseStore();
    const { toast, showToast, hideToast } = useToastStore();
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const { user, token } = useAuthStore();
    const router = useRouter();


    useEffect(() => {
        fetchCategories();
    }, []);


    const handleDelete = async (id) => {
        if (confirmDeleteId !== id) {
            setConfirmDeleteId(id);
            showToast("Klik lagi untuk konfirmasi hapus", "error");
            return;
        }

        try {
            await deleteCategories(id);
            showToast("Artikel berhasil dihapus", "success");
        } catch (error) {
            showToast("Terjadi kesalahan saat menghapus artikel", "error");
        } finally {
            setConfirmDeleteId(null);
            closeDropdown();
        }
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    const closeDropdown = () => {
        setOpenDropdownId(null);
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-fit">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                    No
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                    Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                    Dibuat Pada
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {categories.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-5 py-4 text-start">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {index + 1}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {item.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {moment(item.created_at).locale("id").format("D MMMM YYYY")}
                                            </span>
                                        </div>
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
                                                    onItemClick={() => router.push(`/dashboard/category/edit/${item.id}`)}
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