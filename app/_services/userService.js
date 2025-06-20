import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getUsers = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.data;
};

export const deleteUser = async (id, token) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
};
