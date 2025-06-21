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

import { Trash} from "lucide-react";
import moment from "moment";
import useToastStore from "@/app/_stores/toastStore";
import CustomToast from "@/app/_components/Toast/CustomToast";
import useEmergencyStore from "@/app/_stores/emergencyStore";
import useAuthStore from "@/app/_stores/authStore";

export default function EmergencyTable() {
    const { emergencies,updateStatus, fetchEmergencies, deleteEmergency } = useEmergencyStore();
    const { toast, showToast, hideToast } = useToastStore();
    const { user, token } = useAuthStore();


    useEffect(() => {
        fetchEmergencies();
    }, []);


    const updateEmergencyStatus = async (id, status) => {
        try {
            await updateStatus(token, id, status);
            showToast("Status berhasil diperbarui", "success");
        } catch (error) {
            showToast("Gagal memperbarui status", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmergency(id);
            showToast("Data berhasil dihapus", "success");
        } catch {
            showToast("Gagal menghapus data", "error");
        }
    };


    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-fit">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                    Date
                                </TableCell>
                                {user?.role === "admin" && (
                                    <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                        User
                                    </TableCell>
                                )}
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                    Contacted Via
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {emergencies.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-5 py-4 text-start">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {moment(item.created_at).locale("id").format("D MMMM YYYY")}
                                            </span>
                                        </div>
                                    </TableCell>
                                    {user?.role === "admin" && (
                                        <TableCell className="px-5 py-4 text-start">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {item.user?.name || `ID ${item.user_id}`}
                                                </span>
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell className="px-5 py-4 text-start">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {item.contacted_via}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start">
                                        {user?.role === "admin" ? (
                                            <select
                                                value={item.status}
                                                onChange={(e) => updateEmergencyStatus(item.id, e.target.value)}
                                                className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
                                            >
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        ) : (
                                            <Badge
                                                size="sm"
                                                color={
                                                    item.status === "completed"
                                                        ? "success"
                                                        : item.status === "in_progress"
                                                            ? "warning"
                                                            : "error"
                                                }
                                            >
                                                {item.status}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-rose-100 transition flex w-full items-center justify-center gap-2 rounded-full border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-rose-200 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                                        >
                                            <Trash className="w-4 h-4 dark:text-white/90" />
                                            Delete
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