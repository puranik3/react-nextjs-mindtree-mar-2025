import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { createReview } from "@/data/services/reviews";
import { ReviewSchema } from "@/data/zod/schemas/Review";

import type { IProduct } from "@/types/Product";
import type { IApiResponse, IErrorMessage } from "@/types/api";

type Params = {
    params: { id: string };
};

export async function POST(req: Request, { params }: Params) {
    const session = await getServerSession(authOptions);

    if (!session) {
        const error: IErrorMessage = {
            status: "error",
            message: "Not authenticated!",
        };
        return NextResponse.json(error, { status: 401 });
    }

    try {
        const rawBody = await req.json();
        const parseResult = ReviewSchema.safeParse(rawBody);

        if (!parseResult.success) {
            const issues = parseResult.error.flatten().fieldErrors;
            return NextResponse.json({ status: 'error', message: issues }, { status: 400 });
        }

        const review = {
            ...parseResult.data,
            username: session.user?.email,
            date: new Date().toISOString(),
        };

        const reviews = await createReview(params.id, review);

        const response: IApiResponse<IProduct> = {
            status: "success",
            message: reviews,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        const errorResponse: IErrorMessage = {
            status: "error",
            message: (error as Error).message,
        };

        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json(
        { status: "error", message: "METHOD=GET not allowed" },
        { status: 405 }
    );
}
