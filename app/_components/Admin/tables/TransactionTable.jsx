"use client";

import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableHeader, TableRow, Table } from "@/app/_components/Admin/ui/table";
import { Trash} from "lucide-react";
import Badge from "../ui/badge/Badge";
import useToastStore from "@/app/_stores/toastStore";
import useAuthStore from "@/app/_stores/authStore";
import useTransactionStore from "@/app/_stores/transactionService";

export default function TransactionTable() {
  const { transactions, updateStatus, fetchTransaction, deleteTransaction } = useTransactionStore();
  const { toast, showToast, hideToast } = useToastStore();
  const { user, token } = useAuthStore();


  useEffect(() => {
    fetchTransaction();
  }, []);

  const updateTransactionStatus = async (id, status) => {
    try {
      await updateStatus(token, id, status);
      showToast("Status berhasil diperbarui", "success");
    } catch (error) {
      showToast("Gagal memperbarui status", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
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
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Order Number
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Product
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Quantity
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Total Price
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Status
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Alamat Pemesan
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {transactions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.order_number}</span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{item.user.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.merchandise.name}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.quantity}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.total_price}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    {user?.role === "admin" ? (
                        <select
                            value={item.status}
                            onChange={(e) => updateTransactionStatus(item.id, e.target.value)}
                            className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
                        >
                          <option value="paid">Paid</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                        </select>
                    ) : (
                        <Badge
                            size="sm"
                            color={
                              item.status === "completed"
                                  ? "success"
                                  : item.status === "Shipped"
                                      ? "warning"
                                      : "error"
                            }
                        >
                          {item.status}
                        </Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-start">
                    <span className="block font-medium text-gray-800 line-clamp-2 text-theme-sm dark:text-white/90">{item.user.address}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
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
