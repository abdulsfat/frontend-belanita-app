import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllUsers = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const updateProfile = async (token, data) => {
    const formData = new FormData();

    for (const key in data) {
        formData.append(key, data[key]);
    }

    formData.append("_method", "PUT");

    const res = await axios.post(
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

