"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/app/_components/Admin/ui/table";
import Badge from "@/app/_components/Admin/ui/badge/Badge";
import { Trash} from "lucide-react";
import useToastStore from "@/app/_stores/toastStore";
import useUsersStore from "@/app/_stores/userStore";
import useConfirmStore from "@/app/_stores/confirmStore";

export default function UsersTable() {
    const { users, fetchUsers, deleteUser } = useUsersStore();
    const { toast, showToast, hideToast } = useToastStore();
    const showConfirm = useConfirmStore((state) => state.showConfirm);



    useEffect(() => {
        fetchUsers();
    }, []);


    const handleDelete = (id) => {
        showConfirm({
            title: "Hapus User",
            message: "Apakah kamu yakin ingin menghapus user ini?",
            onConfirm: async () => {
                try {
                    await deleteUser(id);
                    showToast("User berhasil dihapus", "success");
                    fetchUsers();
                } catch (error) {
                    showToast("Terjadi kesalahan saat menghapus user", "error");
                }
            },
        });
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-fit">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">Nama</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">Email</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">No HP</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">Alamat</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">Role</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">Aksi</TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="px-5 py-4 text-start">
                                       <span
                                           className="font-medium text-gray-800 text-theme-sm dark:text-white/90"> {user.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <span
                                            className="font-medium text-gray-800 text-theme-sm dark:text-white/90"> {user.email}
                                        </span></TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <span
                                            className="font-medium text-gray-800 text-theme-sm dark:text-white/90"> {user.phone_number}
                                        </span></TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <span
                                            className="font-medium text-gray-800 text-theme-sm dark:text-white/90"> {user.address}
                                        </span></TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <Badge color={user.role === "admin" ? "primary" : "secondary"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-3 py-3 text-start">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-rose-100 transition flex w-full items-center justify-center gap-2 rounded-full border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-rose-200 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                                        >
                                            <Trash className="w-3 h-3 dark:text-white/90" />
                                        </button>
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
