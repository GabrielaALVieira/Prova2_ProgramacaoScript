import api from "@/services/api";

export const getAllProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};
