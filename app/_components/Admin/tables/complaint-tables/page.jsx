"use client";

import { Dropdown } from "@/app/_components/Admin/ui/dropdown/Dropdown";
import { DropdownItem } from "@/app/_components/Admin/ui/dropdown/DropdownItem";
import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableHeader, TableRow, Table } from "@/app/_components/Admin/ui/table";
import Badge from "@/app/_components/Admin/ui/badge/Badge";
import { EllipsisVertical } from "lucide-react";
import useToastStore from "@/app/_stores/toastStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteComplaint, getAllComplaints } from "@/app/_services/complaintService";

export default function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const { showToast } = useToastStore();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const router = useRouter();

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

  useEffect(() => {
    if (confirmDeleteId !== null) {
      const timeout = setTimeout(() => {
        setConfirmDeleteId(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [confirmDeleteId]);

  const handleDelete = async (id) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      showToast("Klik lagi untuk konfirmasi hapus", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await deleteComplaint(id, token);
      closeDropdown();
      showToast("Pengaduan berhasil dihapus", "success");
      setConfirmDeleteId(null);
      fetchMerch();
    } catch (error) {
      console.error("Gagal menghapus pengaduan:", error);
      showToast("Terjadi kesalahan saat menghapus pengaduan", "error");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-fit">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Subject
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Date
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Location
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Status
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            {/* <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {complaints.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="max-w-full overflow-hidden me-2">
                        <Image width={100} height={80} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`} alt={item.subject} />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.subject}</span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{item.user_id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.date}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.location}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge size="sm" color={item.status === "completed" ? "success" : item.status === "processed" ? "warning" : "error"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="relative inline-block">
                      <button onClick={() => toggleDropdown(item.id)} className="dropdown-toggle">
                        <EllipsisVertical className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                      </button>
                      <Dropdown isOpen={openDropdownId === item.id} onClose={closeDropdown} className="w-40 p-2">
                        <DropdownItem
                          onItemClick={() => router.push(`/dashboard/complaint/detail/${item.slug}`)}
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Detail
                        </DropdownItem>
                        <DropdownItem
                          onItemClick={() => router.push(`/dashboard/complaint/edit/${item.slug}`)}
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem onItemClick={() => handleDelete(item.id)} className="flex w-full font-normal text-left text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-white/5 dark:hover:text-red-400">
                          {confirmDeleteId === item.id ? "Klik lagi untuk hapus" : "Delete"}
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                <TableRow>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="max-w-full overflow-hidden me-2">
                        <Image width={100} height={80} src="/public/images/grid-image/image-01.png" alt="Item complaint" />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">Pelecehan verbal di Depok</span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">user</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">18 Juni 2025</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">Depok</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge size="sm" color="warning">
                      processed
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="relative inline-block">
                      <button onClick="" className="dropdown-toggle">
                        <EllipsisVertical className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                      </button>
                      <Dropdown isOpen="" onClose="" className="w-40 p-2">
                        <DropdownItem
                          onItemClick=""
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Detail
                        </DropdownItem>
                        <DropdownItem
                          onItemClick=""
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem onItemClick="" className="flex w-full font-normal text-left text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-white/5 dark:hover:text-red-400">
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
