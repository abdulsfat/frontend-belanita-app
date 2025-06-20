"use client";

import { Dropdown } from "@/app/_components/Admin/ui/dropdown/Dropdown";
import { DropdownItem } from "@/app/_components/Admin/ui/dropdown/DropdownItem";
import {
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    Table,
} from "@/app/_components/Admin/ui/table";
import Badge from "@/app/_components/Admin/ui/badge/Badge";
import { useModal } from "@/app/_hooks/useModal";
import { getComplaintById } from "@/app/_services/complaintService";
import { EllipsisVertical } from "lucide-react";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import useComplaintStore from "@/app/_stores/complaintStore";
import useToastStore from "@/app/_stores/toastStore";

export default function ComplaintTable() {
    const { complaints, deleteComplaint} = useComplaintStore();
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();
    const { showToast } = useToastStore();

    const toggleDropdown = (id) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    const closeDropdown = () => {
        setOpenDropdownId(null);
    };

    const openViewModal = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const complaint = await getComplaintById(id, token);
            setSelectedComplaint(complaint);
            openModal();
        } catch (err) {
            console.error("Error loading complaint detail:", err);
            showToast("Gagal mengambil detail pengaduan", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteComplaint(id);
            showToast("Data berhasil dihapus", "success");
        } catch (err) {
            showToast("Gagal menghapus data", "error");
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-fit">
                    {complaints.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            <p className="text-theme-md">Tidak ada data pengaduan</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                        Date
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                        Subject
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
                                {complaints.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="px-5 py-4 text-start">
                                            <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {moment(item.updated_at).locale("id").format("D MMMM YYYY")}
                                            </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start">
                                            <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {item.subject}
                                            </span>
                                                <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                                {item.phone}
                                            </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start">
                                            <Badge
                                                size="sm"
                                                color={
                                                    item.status === "completed"
                                                        ? "success"
                                                        : item.status === "processed"
                                                            ? "warning"
                                                            : "error"
                                                }
                                            >
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start">
                                            <div className="relative inline-block">
                                                <button onClick={() => toggleDropdown(item.id)} className="dropdown-toggle">
                                                    <EllipsisVertical className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                                                </button>
                                                <Dropdown
                                                    isOpen={openDropdownId === item.id}
                                                    onClose={closeDropdown}
                                                    className="w-40 p-2"
                                                >
                                                    <DropdownItem
                                                        onItemClick={() => openViewModal(item.id)}
                                                        className="flex w-full text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg"
                                                    >
                                                        Detail
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onItemClick={() => handleDelete(item.id)}
                                                        className="flex w-full text-left font-normal text-red-500 hover:bg-red-100 dark:hover:bg-white/5 dark:hover:text-red-400 rounded-lg"
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
                    )}
                </div>
            </div>
        </div>
    );
}
