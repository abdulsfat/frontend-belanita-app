import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllComplaints = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/complaint`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
};

export const getUserComplaints = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
};

export const getComplaintById = async (id, token) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data.data;
};
export const getDetailComplaint = async (slug) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/${slug}`);
    return response.data.data;
};

export const deleteComplaint = async (id, token) => {
  return axios.delete(`${API_BASE_URL}/complaint/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
