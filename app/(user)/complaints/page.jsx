"use client";

import { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import useAuthStore from "@/app/_stores/authStore";
import CustomToast from "@/app/_components/Toast/CustomToast";
import useToastStore from "@/app/_stores/toastStore";

export default function Complaints() {
  const { token, user } = useAuthStore();
  const [form, setForm] = useState({
    subject: "",
    phone: "",
    date: "",
    location: "",
    description: "",
    image: null,
  });

  const { toast, showToast, hideToast } = useToastStore();


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("subject", form.subject);
    formData.append("description", form.description);
    formData.append("date", form.date);
    formData.append("phone", form.phone);
    formData.append("location", form.location);
    formData.append("image", form.image);
    try {
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/complaint`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
      );

      showToast("Pengaduan berhasil dikirim!", "success");
      setForm({
        subject: "",
        phone: "",
        date: "",
        location: "",
        description: "",
        image: null,
      });
    } catch (error) {
      showToast("Gagal mengirim pengaduan", "error");
    }
  };

  return (
      <div className="py-20 px-4 mt-5 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Banner */}
        <img
            src="/complaints.png"
            alt="We Will Not Be Silenced"
            className="rounded-3xl shadow-lg w-full h-64 sm:h-96 md:h-[32rem] object-cover mb-10 transition-all duration-300"
        />

        {/* Deskripsi */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8 mb-28">
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 leading-snug">
              Your Voice Matters. We're <br /> Here to Help.
            </h2>
          </div>
          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            <p className="text-sm sm:text-md md:text-lg text-gray-800 leading-relaxed">
              We are committed to providing a safe and supportive environment for all women.
              Don’t hesitate to reach out and share your concerns.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="w-4/5">
          <h2 className="text-5xl font-normal text-center text-gray-900 mb-2">Complaint Form</h2>
          <p className="text-center text-lg text-gray-700 mb-10">
            Please Fill Out the Form Below to Submit Your Complaint
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="Subject of complaint"
                    className="mt-1 w-full rounded-xl bg-gray-100 focus:ring-2 focus:ring-purple-500 p-3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+62"
                      className="mt-1 w-full rounded-xl bg-gray-100 focus:ring-2 focus:ring-purple-500 p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Incident</label>

                  <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      type="date"
                      className="mt-1 w-full rounded-xl bg-gray-100 focus:ring-2 focus:ring-purple-500 p-3"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Write your case here"
                    className="mt-1 w-full rounded-xl bg-gray-100 focus:ring-2 focus:ring-purple-500 p-3"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    type="text"
                    placeholder="Location"
                    className="mt-1 w-full rounded-xl bg-gray-100 focus:ring-2 focus:ring-purple-500 p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-100 px-4 py-6 text-sm text-gray-500">
                  <Upload className="h-8 w-8 mb-3" />
                  <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-60 bg-tertiary text-black px-4 py-2 rounded-lg hover:bg-lime-300 transition"
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Note */}
          <div className="mt-8 text-sm italic text-gray-600 space-y-1">
            <p>*Your privacy is our priority. All complaints are confidential.</p>
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-end">
            <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (!token) {
                    showToast("Anda harus login terlebih dahulu", "error");
                    return;
                  }
                  handleSubmit();
                }}
                className="bg-tertiary text-black font-semibold py-3 px-8 rounded-full hover:bg-lime-300 transition"
            >
              Submit
            </button>
          </div>
        </div>
        <CustomToast
            message={toast.message}
            isOpen={toast.isOpen}
            status={toast.status}
            onClose={hideToast}
        />
      </div>
  );
}
