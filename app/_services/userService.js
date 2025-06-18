import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getUsers = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });
    return response.data.data;
};

export const deleteUser = async (id, token) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });
    return response.data;
};
