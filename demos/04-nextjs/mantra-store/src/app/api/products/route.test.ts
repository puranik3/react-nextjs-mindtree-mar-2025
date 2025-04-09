import { GET, POST } from "./route";
import { getProducts } from "@/data/services/products";
import { NextRequest } from "next/server";

jest.mock("@/data/services/products", () => ({
    getProducts: jest.fn(),
}));

describe("API Route Handlers - Products", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET handler", () => {
        it("should return products with default page if no page query is provided", async () => {
            (getProducts as jest.Mock).mockResolvedValue({
                count: 100,
                page: 1,
                products: [{ id: 1, name: "Product 1" }],
            });

            const req = {
                url: "http://localhost/api/products",
            } as NextRequest;

            const res = await GET(req);

            expect(getProducts).toHaveBeenCalledWith(1);
            expect(res.status).toBe(200);
            expect(await res.json()).toEqual({
                status: "success",
                message: {
                    count: 100,
                    page: 1,
                    products: [{ id: 1, name: "Product 1" }],
                },
            });
        });

        it("should return products for the specified page", async () => {
            (getProducts as jest.Mock).mockResolvedValue({
                count: 100,
                page: 2,
                products: [{ id: 2, name: "Product 2" }],
            });

            const req = {
                url: "http://localhost/api/products?page=2",
            } as NextRequest;

            const res = await GET(req);

            expect(getProducts).toHaveBeenCalledWith(2);
            expect(res.status).toBe(200);
            expect(await res.json()).toEqual({
                status: "success",
                message: {
                    count: 100,
                    page: 2,
                    products: [{ id: 2, name: "Product 2" }],
                },
            });
        });

        it("should return 500 if an error occurs", async () => {
            (getProducts as jest.Mock).mockRejectedValue(
                new Error("Database error")
            );

            const req = {
                url: "http://localhost/api/products",
            } as NextRequest;

            const res = await GET(req);

            expect(getProducts).toHaveBeenCalledWith(1);
            expect(res.status).toBe(500);
            expect(await res.json()).toEqual({
                status: "error",
                message: "Database error",
            });
        });
    });

    describe("POST handler", () => {
        it("should return 405 for POST requests", async () => {
            const res = await POST();

            expect(res.status).toBe(405);
            expect(await res.json()).toEqual({
                status: "error",
                message: "METHOD=POST not allowed",
            });
        });
    });
});
