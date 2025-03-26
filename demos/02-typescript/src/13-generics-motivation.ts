type DetailedName = {
    manufacturer: string;
    model: string;
};

type DetailedPrice = {
    base: number;
    gst: number;
};

interface IProduct {
    name: string;
    price: number;
}

interface IProductDetailedName {
    name: DetailedName;
    price: number;
}

interface IProductDetailedNameAndPrice {
    name: DetailedName;
    price: DetailedPrice;
}

const pen: IProduct = {
    name: "Pen",
    price: 50,
};

const pencil: IProductDetailedName = {
    name: {
        manufacturer: "Faber Castell",
        model: "HB",
    },
    price: 10,
};

export {};
