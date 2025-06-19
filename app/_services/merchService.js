// services/articleService.js
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllMerch = async () => {
  const response = await axios.get(`${API_BASE_URL}/merchandise`);
  return response.data.data;
};

export const getDetailMerch = async (slug) => {
  const response = await axios.get(`${API_BASE_URL}/merchandise/${slug}`);
  return response.data.data;
};

export const createMerch = async (token, data) => {
  const response = await axios.post(`${API_BASE_URL}/merchandise`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const getCategories = async (id, token) => {
  const response = await axios.get(`${API_BASE_URL}/category`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const getMerchById = async (id, token) => {
  const response = await axios.get(`${API_BASE_URL}/merchandise/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const deleteMerch = async (id, token) => {
  return axios.delete(`${API_BASE_URL}/merchandise/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRandomMerchExceptSlug = async (slug, limit = 3) => {
  const response = await axios.get(`${API_BASE_URL}/merchandise`);
  const all = response.data.data;

  const filtered = all.filter((item) => item.slug !== slug);
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

export const orderMerchandise = async (token, data) => {
  const response = await axios.post(`${API_BASE_URL}/order`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.data;
};

export const updateMerch = async (slug, token, data) => {
  const response = await axios.post(`${API_BASE_URL}/merchandise/${slug}?_method=PUT`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};
