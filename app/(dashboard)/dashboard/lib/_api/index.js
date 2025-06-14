import axios from "axios";

export const API = axios.create({
baseURL: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api`,
});

export const articleImageStorage = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/storage/articles`;
