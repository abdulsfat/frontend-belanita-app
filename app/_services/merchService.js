import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getMerch = async () => {
    const response = await axios.get(`${API_BASE_URL}/merchandise`);
    return response.data.data;
};

export const getDetailMerch = async (slug) => {
    const response = await axios.get(`${API_BASE_URL}/merchandise/${slug}`);
    return response.data.data;
};

export const getRandomMerchExceptSlug = async (slug, limit = 3) => {
    const response = await axios.get(`${API_BASE_URL}/merchandise`);
    const all = response.data.data;

    const filtered = all.filter((item) => item.slug !== slug);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
};

export const orderMerchandise = async (token, data) => {
    const response = await axios.post(`${API_BASE_URL}/order`, data );
    return response.data.data;
};