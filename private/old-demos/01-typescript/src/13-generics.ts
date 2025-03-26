interface DetailedPrice {
    base: number;
    gst: number;
}

interface DetailedName {
    manufacturer: string;
    model: string;
}

// NameType, PriceType are placeholders for actual data types - they are called generic type parameters
// Generic interfaces are not concrete interfaces, they are templates for concrete interfaces
// NameType = string, PriceType = number are default values for generic type parameters
interface IProduct<NameType = string, PriceType = number> {
    name: NameType;
    price: PriceType;
}

// interface IProduct {
//     name: string;
//     price: number;
// }

// interface IProductDetailedName {
//     name: DetailedName;
//     price: number;
// }

// interface IProductDetailedPrice {
//     name: string;
//     price: DetailedPrice;
// }

// interface IProductDetailedNameDetailedPrice {
//     name: DetailedName;
//     price: DetailedPrice;
// }

// const pen: IProduct<string, number> = {
const pen: IProduct = {
    name: "Pen",
    price: 50,
};

const pencil: IProduct<DetailedName, number> = {
    name: {
        manufacturer: "Faber Castell",
        model: "HB",
    },
    price: 10,
};

const appleIPhone15: IProduct<DetailedName, DetailedPrice> = {
    name: {
        manufacturer: "Apple",
        model: "iPhone 15",
    },
    price: {
        base: 60000,
        gst: 15000,
    },
};

export {};
