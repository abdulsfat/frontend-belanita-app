import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const getAllMerch = async () => {
  const response = await axios.get(`${API_BASE_URL}/merchandise`);
  return response.data.data;
};
//
// export const getMerchBySlug = async (slug) => {
//   const response = await axios.get(`${API_BASE_URL}/merchandise/${slug}`);
//   return response.data.data;
// };

export const createMerch = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/merchandise`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const createCategory = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/category`, data);
  return response.data.data;
};

export const getCategories = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/category`, {
  });
  return response.data.data;
};


export const deleteMerchById = async (id) => {
  return axios.delete(`${API_BASE_URL}/merchandise/${id}`, {
  });
};

export const deleteCategoryById = async (id) => {
  return axios.delete(`${API_BASE_URL}/category/${id}`, {
  });
};


export const updateCategory = async (id, data) => {
  try {
    const response = await axios.put(
        `${API_BASE_URL}/category/${id}`,
        data
    );
    return response.data.data;
  } catch (error) {
    console.error("Gagal update category:", error);
    throw error;
  }
};


export const orderMerchandise = async ( data) => {
    const response = await axios.post(`${API_BASE_URL}/order`, data );
    return response.data.data;
};

export const updateMerch = async (id, data) => {
  const response = await axios.post(`${API_BASE_URL}/merchandise/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  } );
  return response.data.data;
};

