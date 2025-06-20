import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllComplaints = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/complaint`);
        return response.data?.data || [];
    } catch (error) {
        if (error.response?.status === 404) {
            // console.warn("Tidak ada data complaint ditemukan.");
            return []; // amanin, tetap kembalikan array kosong
        }

        // console.error("Gagal ambil complaint:", error);
        return []; // fallback umum untuk error lain
    }
};

export const getComplaintById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/${id}`);
    return response.data.data;
};

export const getDetailComplaint = async (slug) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/${slug}`);
    return response.data.data;
};

export const deleteComplaintById = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/complaint/${id}`);
    return response.data.data;
};
