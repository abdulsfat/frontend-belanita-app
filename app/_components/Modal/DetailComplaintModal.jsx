"use client";

import { Modal } from "@/app/_components/Admin/ui/modal";
import Label from "@/app/_components/Form/Label";
import moment from "moment";
import SafeImage from "@/app/_components/Admin/common/SafeImage";

export default function DetailComplaintModal({ isOpen, onClose, complaint }) {
    if (!isOpen || !complaint) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-6">
                    <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Detail Pengaduan
                    </h4>

                    {/* Gambar */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border mb-6">
                        <SafeImage
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${complaint.image}`}
                            alt="Gambar Pengaduan"
                            fill
                            objectFit="cover"
                        />
                    </div>

                    {/* Grid Detail */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Subject</Label>
                            <p className="text-gray-800 dark:text-white">{complaint.subject}</p>
                        </div>

                        <div>
                            <Label>Status</Label>
                            <p className="text-gray-800 dark:text-white capitalize">{complaint.status}</p>
                        </div>

                        <div>
                            <Label>Nomor HP</Label>
                            <p className="text-gray-800 dark:text-white">{complaint.phone}</p>
                        </div>

                        <div>
                            <Label>Lokasi Kejadian</Label>
                            <p className="text-gray-800 dark:text-white">{complaint.location}</p>
                        </div>

                        <div>
                            <Label>Tanggal Kejadian</Label>
                            <p className="text-gray-800 dark:text-white">{moment(complaint.date).format("LL")}</p>
                        </div>

                        <div>
                            <Label>Pembuatan Laporan</Label>
                            <p className="text-gray-800 dark:text-white">{moment(complaint.created_at).format("LLL")}</p>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div className="mt-4">
                        <Label>Deskripsi</Label>
                        <p className="whitespace-pre-line text-gray-800 dark:text-white">
                            {complaint.description}
                        </p>
                    </div>

                    {/* Tanggapan Admin */}
                    {complaint.feedbacks && complaint.feedbacks.length > 0 && (
                        <div className="mt-6">
                            <Label>Tanggapan Admin</Label>
                            <div className="space-y-3 mt-2">
                                {complaint.feedbacks.map((fb, i) => (
                                    <div
                                        key={i}
                                        className="p-3 rounded-md border bg-gray-50 dark:bg-gray-800"
                                    >
                                        <p className="text-sm text-gray-800 dark:text-white whitespace-pre-line">
                                            {fb.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Oleh: {fb.user?.name || "Admin"} • {moment(fb.created_at).format("LLL")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
