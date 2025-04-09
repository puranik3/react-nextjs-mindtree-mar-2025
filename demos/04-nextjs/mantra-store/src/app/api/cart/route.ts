import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCart, updateCart } from "@/data/services/cart";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { message: "Not authenticated!" },
            { status: 401 }
        );
    }

    const email = session.user.email as string;

    try {
        const cart = await getCart(email);
        return NextResponse.json({
            status: "success",
            message: { cart },
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: "error",
                message: (error as Error).message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { message: "Not authenticated!" },
            { status: 401 }
        );
    }

    const email = session.user.email as string;

    try {
        const body = await req.json();
        const updatedCart = await updateCart(email, body);
        return NextResponse.json({
            status: "success",
            message: { cart: updatedCart },
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: "error",
                message: (error as Error).message,
            },
            { status: 500 }
        );
    }
}