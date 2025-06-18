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

import { useModal } from "@/app/_hooks/useModal";
import {getAllComplaints, getComplaintById} from "@/app/_services/complaintService";
import {EllipsisVertical} from "lucide-react";

export default function ComplaintTable() {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const fetchComplaints = async () => {
        setIsLoading(true);
        try {
            const data = await getAllComplaints();
            setComplaints(data || []);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

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