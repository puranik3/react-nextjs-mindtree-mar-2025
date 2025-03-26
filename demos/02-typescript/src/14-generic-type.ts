type DetailedName = {
    manufacturer: string;
    model: string;
};

type DetailedPrice = {
    base: number;
    gst: number;
};

interface IProduct<NameType, PriceType> {
    name: NameType;
    price: PriceType;
}

// interface IProductDetailedName {
//     name: DetailedName;
//     price: number;
// }

// interface IProductDetailedNameAndPrice {
//     name: DetailedName;
//     price: DetailedPrice;
// }

const pen: IProduct<string, number> = {
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
