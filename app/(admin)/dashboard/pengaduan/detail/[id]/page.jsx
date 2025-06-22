"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Label from "@/app/_components/Form/Label";
import Image from "next/image";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import { formatDate } from "@/app/_utils/dateFormatter";
import useComplaintStore from "@/app/_stores/complaintStore";
import TextArea from "@/app/_components/Form/input/TextArea";
import moment from "moment";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import useGoBack from "@/app/_hooks/useGoBack";
import SafeImage from "@/app/_components/Admin/common/SafeImage";

export default function PengaduanDetail() {
    const { id } = useParams();
    const { getComplaintById, fetchComplaints, submitFeedback, updateStatus } = useComplaintStore();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();
    const goBack = useGoBack();

    const [localComplaint, setLocalComplaint] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!id) return;

        const complaint = getComplaintById(parseInt(id));

        if (complaint) {
            setLocalComplaint(complaint);
            setStatus(complaint.status);
        } else {
            fetchComplaints()
                .then(() => {
                    const refreshed = useComplaintStore.getState().getComplaintById(parseInt(id));
                    if (refreshed) {
                        setLocalComplaint(refreshed);
                        setStatus(refreshed.status);
                    } else {
                        showToast("Complaint tidak ditemukan", "error");
                    }
                })
                .catch(() => {
                    showToast("Gagal memuat complaint", "error");
                });
        }
    }, [id, getComplaintById, fetchComplaints]);

    const handleSubmitFeedback = async () => {
        if (!feedbackText.trim()) return showToast("Tanggapan tidak boleh kosong", "error");

        const payload = {
            complaint_id: localComplaint.id,
            message: feedbackText,
        };

        setLoadingSubmit(true);
        try {
            await submitFeedback(token, payload);
            showToast("Tanggapan berhasil dikirim", "success");

            setLocalComplaint((prev) => ({
                ...prev,
                feedbacks: [...(prev.feedbacks || []), {
                    message: feedbackText,
                    created_at: new Date().toISOString(),
                    user: { name: "Anda" },
                }],
            }));
            setFeedbackText("");
        } catch (error) {
            console.error("Gagal mengirim feedback:", error.response?.data || error.message);
            showToast("Gagal mengirim tanggapan", "error");
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        try {
            await updateStatus(token, localComplaint.id, newStatus);
            showToast("Status diperbarui", "success");
        } catch (error) {
            console.error("Gagal update status:", error.response?.data || error.message);
            showToast("Gagal memperbarui status", "error");
        }

        if (localComplaint.status === "completed") {
            showToast("Status tidak bisa diubah karena sudah selesai", "error");
        }
    };

    if (!localComplaint) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="space-y-6">
            <ComponentCard title="Detail Complaint" action="Kembali" onclick={goBack}>
                <div className="mb-6">
                    <div className="relative w-full max-w-sm aspect-video rounded-lg overflow-hidden border">
                        <SafeImage
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${localComplaint.image}`}
                            alt="Gambar Artikel"
                            fill
                            objectFit="cover"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label>Subject Pengaduan</Label>
                        <p className="mt-1 text-gray-800 dark:text-white">{localComplaint.subject}</p>
                    </div>
                    <div>
                        <Label>Status</Label>
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        >
                            <option value="pending">Pending</option>
                            <option value="processed">Processed</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <Label>Nomor Pengadu</Label>
                        <p className="mt-1 text-gray-800 dark:text-white">{localComplaint.phone}</p>
                    </div>
                    <div>
                        <Label>Lokasi Kejadian</Label>
                        <p className="mt-1 text-gray-800 dark:text-white">{localComplaint.location}</p>
                    </div>
                    <div>
                        <Label>Tanggal Kejadian</Label>
                        <p className="mt-1 text-gray-800 dark:text-white">{moment(localComplaint.date).format("LL")}</p>
                    </div>
                    <div>
                        <Label>Pengadu</Label>
                        <p className="mt-1 text-gray-800 dark:text-white">
                            {localComplaint.user?.name || `ID ${localComplaint.user_id}`}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <Label>Deskripsi Pengaduan</Label>
                    <p className="mt-1 text-gray-800 dark:text-white whitespace-pre-line">
                        {localComplaint.description}
                    </p>
                </div>

                <div className="mt-4">
                    <Label>Tanggapan</Label>
                    {localComplaint.feedbacks && localComplaint.feedbacks.length > 0 ? (
                        <div className="space-y-2 mt-2">
                            {localComplaint.feedbacks.map((f, idx) => (
                                <div key={idx} className="p-3 border rounded bg-gray-50 dark:bg-gray-800">
                                    <p className="text-sm text-gray-800 dark:text-white whitespace-pre-line">{f.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Oleh: {f.user?.name || "Petugas"} • {formatDate(f.created_at)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2 mt-2">
                            <TextArea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="Tulis tanggapan..."
                            />
                            <button
                                onClick={handleSubmitFeedback}
                                disabled={loadingSubmit}
                                className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50"
                            >
                                {loadingSubmit ? "Mengirim..." : "Kirim Tanggapan"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <Label>Terakhir Diperbarui</Label>
                    <p className="mt-1 text-gray-800 dark:text-white">
                        {formatDate(localComplaint.updated_at)}
                    </p>
                </div>
            </ComponentCard>
        </div>
    );
}
