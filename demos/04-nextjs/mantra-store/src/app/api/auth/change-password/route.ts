import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import mongoose from "@/data/init";

const User = mongoose.model("User");

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions); // only authenticated users will be allowed to proceed

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { message: "Not authenticated!" },
                { status: 401 }
            );
        }

        const email = session.user.email;
        const { oldPassword, newPassword } = await req.json(); // reading from the request body

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found!" },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password!" },
                { status: 403 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        return NextResponse.json({ message: "Password updated successfully!" });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred!" },
            { status: 500 }
        );
    }
}

export function GET() {
    return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
    );
}