"use client";

import {Dropdown} from "@/app/_components/Admin/ui/dropdown/Dropdown";
import {DropdownItem} from "@/app/_components/Admin/ui/dropdown/DropdownItem";
import {
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    Table,
} from "@/app/_components/Admin/ui/table";
import {getComplaintById} from "@/app/_services/complaintService";
import {EllipsisVertical} from "lucide-react";
import {useState} from "react";
import {useModal} from "@/app/_hooks/useModal";
import useComplaintStore from "@/app/_stores/complaintStore";
import useToastStore from "@/app/_stores/toastStore";
import useAuthStore from "@/app/_stores/authStore";
import Badge from "@/app/_components/Admin/ui/badge/Badge";
import moment from "moment/moment";
import {useRouter} from "next/navigation";


export default function ComplaintTable() {
    const {complaints, deleteComplaint} = useComplaintStore();
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const {isOpen, openModal, closeModal} = useModal();
    const {showToast} = useToastStore();
    const { user } = useAuthStore();
    const router = useRouter();


    const toggleDropdown = (id) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    const closeDropdown = () => {
        setOpenDropdownId(null);
    };


    // FIXED
    const handleDelete = async (id) => {
        try {
            await deleteComplaint(id);
            showToast("Data berhasil dihapus", "success");
        } catch (err) {
            showToast("Gagal menghapus data", "error");
        }
    };

    return (
        <div
            className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
                                    <TableCell isHeader
                                               className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                        Date
                                    </TableCell>
                                    {user?.role === "admin" && (
                                        <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                            Pengadu
                                        </TableCell>
                                    )}
                                    <TableCell isHeader
                                               className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                        Subject
                                    </TableCell>
                                    <TableCell isHeader
                                               className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                        Status
                                    </TableCell>
                                    {user?.role === "admin" && (
                                        <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                            Status Tanggapan
                                        </TableCell>
                                    )}
                                    <TableCell isHeader
                                               className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {complaints.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="px-5 py-4 text-start">
                                 <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {moment(item.updated_at).locale("id").format("D MMMM YYYY")}
                                            </span>

                                        </TableCell>
                                        {user?.role === "admin" && (
                                            <TableCell className="px-5 py-4 text-start">
                                            <span
                                                className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {item.user.name}
                                            </span>
                                            </TableCell>
                                        )}

                                        <TableCell className="px-5 py-4 text-start">
                                            <span
                                                className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {item.subject}
                                            </span>
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
                                        {user?.role === "admin" && (
                                            <TableCell className="px-4 py-3 text-start">
                                                <Badge
                                                    size="sm"
                                                    color={
                                                        item.feedbacks.length > 0
                                                            ? "success"
                                                            : "error"
                                                    }
                                                >
                                                    {item.feedbacks.length > 0 ? "Sudah Ditanggapi" : "Belum Ditanggapi"}
                                                </Badge>
                                            </TableCell>
                                        )}
                                        <TableCell className="px-4 py-3 text-start">
                                            <div className="relative inline-block">
                                                <button onClick={() => toggleDropdown(item.id)}
                                                        className="dropdown-toggle">
                                                    <EllipsisVertical
                                                        className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"/>
                                                </button>
                                                <Dropdown
                                                    isOpen={openDropdownId === item.id}
                                                    onClose={closeDropdown}
                                                    className="w-40 p-2"
                                                >

                                                    <DropdownItem
                                                        onClick={() => {
                                                            if (user?.role === "admin") {
                                                                router.push(`/dashboard/pengaduan/detail/${item.id}`);
                                                            } else {
                                                                openModal("COMPLAINT", {
                                                                    complaint: item,
                                                                    user,
                                                                    refetchComplaints: useComplaintStore.getState().fetchComplaints,
                                                                });
                                                            }
                                                        }}
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