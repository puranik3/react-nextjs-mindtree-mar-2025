// This is a server action (This directive is NOT for server components)
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createReview } from "@/data/services/reviews";
import { ReviewSchema } from "@/data/zod/schemas/Review";

export async function addReviewAction(
    productId: string,
    data: { rating: number; text: string }
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Not authenticated!");
    }

    const result = ReviewSchema.safeParse(data);

    if (!result.success) {
        const issues = result.error.flatten().fieldErrors;
        throw new Error(`Validation failed: ${JSON.stringify(issues)}`);
    }

    const review = {
        ...result.data,
        username: session.user?.email,
        date: new Date().toISOString(),
    };

    const updatedReviews = await createReview(productId, review);
    return updatedReviews;
}
