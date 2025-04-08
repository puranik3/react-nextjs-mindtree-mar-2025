export interface IUserCartItem {
    productId: string;
    quantity: number;
}

export interface IUser {
    email: string;
    username: string;
    password: string;
    role?: "customer" | "admin";
    cart?: IUserCartItem[];
}
