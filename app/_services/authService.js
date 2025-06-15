import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

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
