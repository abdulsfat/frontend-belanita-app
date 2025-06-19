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

export const deleteTransaction = async (id, token) => {
  return axios.delete(`${API_BASE_URL}/order/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTransaction = async (slug, token, data) => {
  const response = await axios.post(`${API_BASE_URL}/order/${slug}?_method=PUT`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};
