import axios from "axios";
import type { Product } from "../../types/product";

export const fetchProducts = async () : Promise<Product[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
    if(!response.data) {
        throw new Error("Failed to fetch products");
    }
    return response.data.data.data;
}