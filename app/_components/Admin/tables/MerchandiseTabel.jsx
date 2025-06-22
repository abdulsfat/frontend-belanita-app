"use client";

import {Dropdown} from "@/app/_components/Admin/ui/dropdown/Dropdown";
import {DropdownItem} from "@/app/_components/Admin/ui/dropdown/DropdownItem";
import React, {useState} from "react";
import {TableBody, TableCell, TableHeader, TableRow, Table} from "@/app/_components/Admin/ui/table";
import {EllipsisVertical} from "lucide-react";
import {useRouter} from "next/navigation";
import useToastStore from "@/app/_stores/toastStore";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";
import SafeImage from "@/app/_components/Admin/common/SafeImage";
import useConfirmStore from "@/app/_stores/confirmStore";

export default function MerchandiseTable() {
    const router = useRouter();
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const {showToast} = useToastStore();
    const {deleteMerchandise, fetchMerchandises, merchandises} = useMerchandiseStore();
    const showConfirm = useConfirmStore((state) => state.showConfirm);

    const toggleDropdown = (id) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    const closeDropdown = () => {
        setOpenDropdownId(null);
    };

    const handleDelete = (id) => {
        showConfirm({
            title: "Hapus Merchandise",
            message: "Apakah kamu yakin ingin menghapus merchandise ini?",
            onConfirm: async () => {
                try {
                    await deleteMerchandise(id);
                    showToast("Merchandise berhasil dihapus", "success");
                    fetchMerchandises();
                } catch (error) {
                    showToast("Terjadi kesalahan saat menghapus merchandise", "error");
                }
            },
        });
    };

    return (
        <div
            className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-fit">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader
                                           className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                                    Product Name
                                </TableCell>
                                <TableCell isHeader
                                           className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                                    Stock
                                </TableCell>
                                <TableCell isHeader
                                           className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                                    Price
                                </TableCell>
                                <TableCell isHeader
                                           className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                                    Category
                                </TableCell>
                                <TableCell isHeader
                                           className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {merchandises.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-4 py-3 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="max-w-full overflow-hidden ">
                                                <SafeImage width={100} height={80}
                                                           src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`}
                                                           alt={item.name}/>
                                            </div>
                                            <div>
                                                <span
                                                    className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.name}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start">
                                        <span
                                            className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.stock}</span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start">
                                        <span
                                            className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.price}</span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start">
                                        <span
                                            className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.category?.name || "Unknown product"}</span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start">
                                        <div className="relative inline-block">
                                            <button onClick={() => toggleDropdown(item.id)} className="dropdown-toggle">
                                                <EllipsisVertical
                                                    className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"/>
                                            </button>
                                            <Dropdown isOpen={openDropdownId === item.id} onClose={closeDropdown}
                                                      className="w-40 p-2">
                                                <DropdownItem
                                                    onItemClick={() => router.push(`/dashboard/catalog/detail/${item.slug}`)}
                                                    className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:text-gray-400 dark:hover:text-gray-300"
                                                >
                                                    Detail
                                                </DropdownItem>
                                                <DropdownItem
                                                    onItemClick={() => router.push(`/dashboard/catalog/edit/${item.id}`)}
                                                    className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem onItemClick={() => handleDelete(item.id)}
                                                              className="flex w-full font-normal text-left text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-white/5 dark:hover:text-red-400">
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
        </div>
    );
}
