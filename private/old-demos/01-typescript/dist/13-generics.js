"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const pen = {
    name: "Pen",
    price: 50,
};
const pencil = {
    name: {
        manufacturer: "Faber Castell",
        model: "HB",
    },
    price: 10,
};
const appleIPhone15 = {
    name: {
        manufacturer: "Apple",
        model: "iPhone 15",
    },
    price: {
        base: 60000,
        gst: 15000,
    },
};
