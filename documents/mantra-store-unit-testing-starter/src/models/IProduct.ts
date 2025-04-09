interface IProduct {
    rating: {
        rate: number;
        count: number;
    };
    _id: string;
    title: string;
    price: number | string;
    category:
        | "electronics"
        | "men's clothing"
        | "women's clothing"
        | "jewelery";
    image: string;
    description?: string;
}

export default IProduct;
