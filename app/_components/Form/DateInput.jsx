import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import React, { forwardRef } from "react";

export const DateInput = forwardRef(({ value, onClick }, ref) => (
    <div
        onClick={onClick}
        ref={ref}
        className="w-full flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3 cursor-pointer focus:ring-2 focus:ring-purple-500"
    >
        <span className="text-gray-700 truncate">{value || "Pilih tanggal"}</span>
        <CalendarDays size={20} className="text-gray-500 ml-2 shrink-0" />
    </div>
));
