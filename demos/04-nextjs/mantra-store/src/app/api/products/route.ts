// export async function GET(req: NextRequest) {
//     return NextResponse.json({
//         status: "success",
//         message: "List of products will be sent (todo)",
//     });
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IProduct } from "@/types/Product";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { getProducts } from "@/data/services/products";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const pageParam = searchParams.get("page");
        const page = pageParam ? Number(pageParam) : 1;

        const { count, page: inferredPage, products } = await getProducts(page);

        const json: IApiResponse<{
            count: number;
            page: number;
            products: IProduct[];
        }> = {
            status: "success",
            message: {
                count,
                page: inferredPage,
                products,
            },
        };

        return NextResponse.json(json);
    } catch (error) {
        const err: IErrorMessage = {
            status: "error",
            message: (error as Error).message,
        };
        return NextResponse.json(err, { status: 500 });
    }
}

export async function POST() {
    return NextResponse.json(
        {
            status: "error",
            message: "METHOD=POST not allowed (todo)",
        } satisfies IErrorMessage,
        { status: 405 }
    );
}
