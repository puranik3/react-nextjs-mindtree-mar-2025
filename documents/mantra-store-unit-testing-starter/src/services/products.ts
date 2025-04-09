import axios from "axios";
import store from "../store";
import IProduct from "../models/IProduct";

export type IGetProductsResponse = {
    count: number;
    page: number;
    products: IProduct[];
};

export type IPostProductPayload = Omit<IProduct, "_id" | "rating">;

const { REACT_APP_API_BASE_URL: apiBaseUrl } = process.env;

const getProducts = async (page: number) => {
    try {
        const response = await axios.get<IGetProductsResponse>(
            `${apiBaseUrl}/products?page=${page}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const postProduct = async (product: IPostProductPayload) => {
    try {
        const token = store.getState().auth.token;

        const response = await axios.post<IProduct>(
            `${apiBaseUrl}/products`,
            product,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getProducts, postProduct };
