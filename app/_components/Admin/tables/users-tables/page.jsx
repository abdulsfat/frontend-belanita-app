"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/app/_components/Admin/ui/table";
import Badge from "@/app/_components/Admin/ui/badge/Badge";
import { EllipsisVertical } from "lucide-react";
import { Dropdown } from "@/app/_components/Admin/ui/dropdown/Dropdown";
import { DropdownItem } from "@/app/_components/Admin/ui/dropdown/DropdownItem";
import useToastStore from "@/app/_stores/toastStore";
import { getUsers, deleteUser } from "@/app/_services/userService";
import useAuthStore from "@/app/_stores/authStore";

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const { showToast } = useToastStore();
    const { token } = useAuthStore(); // ambil token login

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await getUsers(token); // kirim token
            setUsers(data || []);
        } catch (error) {
            showToast("Gagal mengambil data pengguna", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (confirmDeleteId !== null) {
            const timeout = setTimeout(() => setConfirmDeleteId(null), 3000);
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
            const token = localStorage.getItem("token");
            await deleteUser(id, token);

            showToast("Pengguna berhasil dihapus", "success");
            fetchUsers();
            setConfirmDeleteId(null);
            closeDropdown();
        } catch (error) {
            console.error(error);
            showToast("Gagal menghapus pengguna", "error");
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-fit">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3">Nama</TableCell>
                                <TableCell isHeader className="px-5 py-3">Email</TableCell>
                                <TableCell isHeader className="px-5 py-3">No HP</TableCell>
                                <TableCell isHeader className="px-5 py-3">Alamat</TableCell>
                                <TableCell isHeader className="px-5 py-3">Role</TableCell>
                                <TableCell isHeader className="px-5 py-3">Aksi</TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="px-5 py-3">{user.name}</TableCell>
                                    <TableCell className="px-5 py-3">{user.email}</TableCell>
                                    <TableCell className="px-5 py-3">{user.phone_number}</TableCell>
                                    <TableCell className="px-5 py-3">{user.address}</TableCell>
                                    <TableCell className="px-5 py-3">
                                        <Badge color={user.role === "admin" ? "primary" : "secondary"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-5 py-3">
                                        <div className="relative inline-block">
                                            <button onClick={() => toggleDropdown(user.id)}>
                                                <EllipsisVertical className="text-gray-400 hover:text-gray-700" />
                                            </button>
                                            <Dropdown
                                                isOpen={openDropdownId === user.id}
                                                onClose={closeDropdown}
                                                className="w-40 p-2"
                                            >
                                                <DropdownItem
                                                    onItemClick={() => handleDelete(user.id)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    {confirmDeleteId === user.id ? "Klik lagi untuk hapus" : "Hapus"}
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
