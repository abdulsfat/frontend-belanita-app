// services/articleService.js
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllTransaction = async () => {
  const response = await axios.get(`${API_BASE_URL}/order`);
  return response.data.data;
};

export const getDetailTransaction = async (slug) => {
  const response = await axios.get(`${API_BASE_URL}/order/${slug}`);
  return response.data.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/order/${id}`);
  return response.data.message;
};

export const updateTransactionStatus = async (token, id, status) => {
  try {
    const response = await axios.put(
        `${API_BASE_URL}/order/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
    );

    console.log("🧾 Full response dari server:", response.data); // cek ini juga
    return response.data.data; // pastikan ini sesuai struktur dari backend
  } catch (error) {
    console.error("❌ Gagal update status (service):", error.response?.data || error);
    throw error;
  }
};

export const updateTransaction = async (id, token, data) => {
  const response = await axios.post(`${API_BASE_URL}/order/${id}?_method=PUT`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};
