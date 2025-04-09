import axios from "axios";
import { IReview } from "../types/Product";

type IPostReviewResponse = {
    status: "success" | "error";
    message: IReview[];
};

export const postReview = async (
    productId: string,
    review: Pick<IReview, "rating" | "text">
) => {
    const response = await axios.post<IPostReviewResponse>(
        `/api/products/${productId}/reviews`,
        review,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};