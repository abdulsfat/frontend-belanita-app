import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllUsers = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.data;
};

export const deleteUser = async (id, token) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const updateProfile = async (token, formData) => {
    const res = await axios.put(
        `${API_BASE_URL}/user/profile`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return res.data.data;
};
