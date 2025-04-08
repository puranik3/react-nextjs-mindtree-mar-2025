import { NextRequest, NextResponse } from "next/server";

export function GET(res: NextRequest) {
    return NextResponse.json({
        status: "success",
        message: "You can access this API using /api/admin/*",
    });
}
