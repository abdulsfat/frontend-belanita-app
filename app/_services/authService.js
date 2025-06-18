import axios from "axios";
import useAuthStore from "@/app/_stores/authStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

const setAuthHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loginUser = async (email, password) => {
    const response = await axios.post(
        `${API_BASE_URL}/login`,
        { email, password },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );

    const { access_token, user } = response.data;


    useAuthStore.getState().setAuth(user, access_token);
    setAuthHeader(access_token);

    return response.data;
};

export const registerUser = async (data) => {
    const response = await axios.post(
        `${API_BASE_URL}/register`,
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

export const logoutUser = async () => {
    const token = useAuthStore.getState().token;

    try {
        await axios.post(`${API_BASE_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.warn("Logout gagal:", err);
    }

    useAuthStore.getState().logout();
    delete axios.defaults.headers.common["Authorization"];

    return true;
};

export const restoreAuth = () => {
    const { token } = useAuthStore.getState();
    if (token) {
        setAuthHeader(token);
    }
};
