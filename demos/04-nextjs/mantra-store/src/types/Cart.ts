import { IProduct } from "./Product";

export interface ICartItem {
    product: string | IProduct;
    quantity: number;
}