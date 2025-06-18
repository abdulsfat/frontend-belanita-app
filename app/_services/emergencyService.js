import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllEmergencies = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/emergency`);
    return response.data.data;
};

export const getUserEmergencies = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/emergency`);
    return response.data.data;
};

export const getEmergencyById = async (id, token) => {
    const response = await axios.get(`${API_BASE_URL}/emergency/${id}`);
    return response.data.data;
};

export const createEmergencyRequest = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/emergency`, data);
    return response.data.data;
};

export const updateEmergencyStatus = async (id, status, token) => {
    const response = await axios.put(`${API_BASE_URL}/emergency/${id}`, {
        status: status,
    });
    return response.data.data;
};

export const deleteEmergencyRequest = async (id, token) => {
    const response = await axios.delete(`${API_BASE_URL}/emergency/${id}`);
    return response.data.message;
};
