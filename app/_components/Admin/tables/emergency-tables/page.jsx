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
import { deleteEmergency, getAllEmergency } from "@/app/_services/emergencyService";

export default function EmergencyTable() {
  const [emergency, setEmergency] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const { showToast } = useToastStore();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const router = useRouter();

  const fetchEmergency = async () => {
    setIsLoading(true);
    try {
      const data = await getAllEmergency();
      setEmergency(data || []);
    } catch (error) {
      console.error("Error fetching emergency:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergency();
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
      await deleteEmergency(id, token);

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
                  Username
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Contact Via
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
              {emergency.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.contacted_via}</span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{item.user_id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">Kecamatan Kebon Jeruk, Jakarta Pusat, Indonesia</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge size="sm" color={item.notification_status === "resolved" ? "success" : item.status === "notified" ? "warning" : "error"}>
                      {item.notification_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="relative inline-block">
                      <button onClick={() => toggleDropdown(item.id)} className="dropdown-toggle">
                        <EllipsisVertical className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                      </button>
                      <Dropdown isOpen={openDropdownId === item.id} onClose={closeDropdown} className="w-40 p-2">
                        <DropdownItem
                          onItemClick={() => router.push(`/dashboard/emergency/detail/${item.slug}`)}
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Detail
                        </DropdownItem>
                        <DropdownItem
                          onItemClick={() => router.push(`/dashboard/emergency/edit/${item.slug}`)}
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
                      <div>
                        <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">user123</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">Call</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">Kecamatan Kebon Jeruk, Jakarta Pusat, Indonesia</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge size="sm" color="warning">
                      notified
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
