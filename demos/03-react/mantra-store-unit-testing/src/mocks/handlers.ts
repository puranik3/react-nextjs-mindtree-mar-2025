import { rest } from "msw";

import productsPage1 from "./data/products-page-1";
import productsPage2 from "./data/products-page-2";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const handlers = [
    rest.get(`${baseUrl}/products`, (req, res, ctx) => {
        const page = req.url.searchParams.get("page"); // 'https://.../products?page=1'

        console.log("page = ", page);

        if (page === "1") {
            return res(
                ctx.status(200),
                ctx.set("Content-Type", "application/json"),
                ctx.json(productsPage1)
            );
        }

        if (page === "2") {
            return res(
                ctx.status(200),
                ctx.set("Content-Type", "application/json"),
                ctx.json(productsPage2)
            );
        }

        return res(
            ctx.status(200),
            ctx.set("Content-Type", "application/json"),
            ctx.json(productsPage1)
        );
    }),
];

// configure failure responses
export const errorHandlers = [
    rest.get(`${baseUrl}/products`, (req, res, ctx) => {
        return res(ctx.status(500));
    }),
];