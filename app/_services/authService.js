import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const loginUser = async (email, password) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/login`,
        { email, password },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );

    return response.data;
};

export const registerUser = async (data) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/register`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
    return response.data;
};

export const logoutUser = async (token) => {
    try {
        await axios.post(
            `${API_BASE_URL}/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return true;
    } catch (err) {
        console.warn("Logout gagal:", err);
        return false;
    }
};
