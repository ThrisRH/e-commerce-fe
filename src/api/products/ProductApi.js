import axios from "axios";
import Product from "../../models/Product";

export const fetchProducts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
    if(!response.data || !response.data.data) {
        throw new Error("Failed to fetch products");
    }
    
    return Product.fromJson(response.data.data.data || response.data.data);
}