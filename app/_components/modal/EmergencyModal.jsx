"use client";

import { Modal } from "@/app/_components/Admin/ui/modal";
import { useEffect, useState } from "react";
import useToastStore from "@/app/_stores/toastStore";
import { createEmergencyRequest } from "@/app/_services/emergencyService";

const WHATSAPP_NUMBER = "6281517343090";
const PHONE_NUMBER = "081234567890";

export default function EmergencyModal({ isOpen, onClose }) {
    const { showToast } = useToastStore();
    const [location, setLocation] = useState({ lat: null, long: null });
    const [locationReady, setLocationReady] = useState(false);

    useEffect(() => {
        if (isOpen) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({
                        lat: pos.coords.latitude,
                        long: pos.coords.longitude,
                    });
                    setLocationReady(true);
                },
                () => {
                    showToast("Gagal mengambil lokasi", "error");
                }
            );
        }
    }, [isOpen]);

    const sendToBackend = async (contacted_via) => {
        if (!location.lat || !location.long) {
            showToast("Lokasi belum siap. Mohon tunggu sebentar.", "error");
            return;
        }

        try {
            await createEmergencyRequest({
                contacted_via,
                lat: location.lat,
                long: location.long,
            });
        } catch (error) {
            console.error("Error response:", error.response?.data || error);
            showToast("Gagal mengirim data ke server", "error");
        }
    };

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent("Halo min, aku butuh bantuan sekarang 🙏");
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        sendToBackend("message");
        window.open(url, "_blank");
    };

    const handlePhoneClick = () => {
        sendToBackend("call");
        window.open(`tel:${PHONE_NUMBER}`, "_self");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar bg-tertiary relative w-full max-w-[700px] overflow-y-auto rounded-3xl p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Emergency Call Options
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Need Immediate Help? Choose Your Preferred Method
                    </p>

                    <div className="flex flex-col items-center gap-3 text-sm">
                        <button
                            onClick={handleWhatsAppClick}
                            disabled={!locationReady}
                            className={`transition ease-in-out rounded-2xl w-full text-start p-4 border-2 border-secondary ${
                                !locationReady ? "opacity-50 cursor-not-allowed" : "hover:bg-lime-950/5"
                            }`}
                        >
                            <h1 className="text-lg mb-2">Chat via WhatsApp</h1>
                            <p className="text-sm text-gray-700 mb-3">
                                Start a chat with our admin team on WhatsApp. They will assist you and arrange a call if necessary.
                            </p>
                        </button>
                        <button
                            onClick={handlePhoneClick}
                            disabled={!locationReady}
                            className={`transition ease-in-out rounded-2xl w-full text-start p-4 border-2 border-secondary ${
                                !locationReady ? "opacity-50 cursor-not-allowed" : "hover:bg-lime-950/5"
                            }`}
                        >
                            <h1 className="text-lg mb-2">Direct Phone Call</h1>
                            <p className="text-sm text-gray-700 mb-3">
                                Call us directly for urgent assistance. Please ensure you have sufficient phone credit.
                            </p>
                        </button>
                    </div>

                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:mt-5">
                        Your safety and well-being are our top priorities. Don't hesitate to reach out!
                    </p>
                </div>
            </div>
        </Modal>
    );
}
