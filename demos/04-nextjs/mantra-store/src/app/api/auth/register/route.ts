import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { register } from "@/data/services/auth";
import type { IUser } from "@/types/User";
import type { IApiResponse, IErrorMessage } from "@/types/api";

export async function POST(req: NextRequest) {
    try {
        const user: IUser = await req.json(); // read data from request body
        const registeredUser = await register(user); // add user to db

        const response: IApiResponse<IUser> = { // generate success response and send it
            status: "success",
            message: registeredUser,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        const errRes: IErrorMessage = { // if error occured, generate error response and send it
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
