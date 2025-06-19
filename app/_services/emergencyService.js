import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllEmergency = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/emergency`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
};

export const getEmergencyById = async (id, token) => {
    const response = await axios.get(`${API_BASE_URL}/emergency/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data.data;
};
export const getDetailEmergency = async (slug) => {
    const response = await axios.get(`${API_BASE_URL}/emergency/${slug}`);
    return response.data.data;
};

export const deleteEmergency = async (id, token) => {
  return axios.delete(`${API_BASE_URL}/emergency/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
