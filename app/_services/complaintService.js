import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllComplaints = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/complaint`);
    return response.data.data;
};

export const getUserComplaints = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/user`);
    return response.data.data;
};

export const getComplaintById = async (id, token) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/${id}`);
    return response.data.data;
};
export const getDetailComplaint = async (slug) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/${slug}`);
    return response.data.data;
};


