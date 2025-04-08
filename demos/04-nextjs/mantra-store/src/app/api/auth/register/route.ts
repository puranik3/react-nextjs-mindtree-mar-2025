import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { register } from "@/data/services/auth";
import type { IUser } from "@/types/User";
import type { IApiResponse, IErrorMessage } from "@/types/api";

export async function POST(req: NextRequest) {
    try {
        const user: IUser = await req.json();
        const registeredUser = await register(user);

        const response: IApiResponse<IUser> = {
            status: "success",
            message: registeredUser,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        const errRes: IErrorMessage = {
            status: "error",
            message: (error as Error).message,
        };

        return NextResponse.json(errRes, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json(
        {
            status: "error",
            message: "METHOD=GET not allowed",
        },
        { status: 405 }
    );
}
