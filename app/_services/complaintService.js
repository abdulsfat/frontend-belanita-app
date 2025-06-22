import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllComplaints = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/complaint`);
        return response.data?.data || [];
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }

        return [];
    }
};

export const getComplaintById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/complaint/${id}`);
    return response.data.data;
};

export const createComplaint = async (token, formData) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/complaint`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.data;
};


export const deleteComplaintById = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/complaint/${id}`);
    return response.data.data;
};

export const submitFeedback = async (payload) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/feedback`,
            payload,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Gagal mengirim feedback:", error);
        throw error;
    }
};

export const updateComplaintStatus = async (token, complaintId, status) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/complaint/${complaintId}`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Gagal update status:", error);
        throw error;
    }
};
