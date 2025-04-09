import mongoose from "@/data/init";
import { IReview } from "@/types/Product";

const Product = mongoose.model("Product");

export const createReview = async (_id: string, review: IReview) => {
    const product = await Product.findByIdAndUpdate(
        _id,
        {
            $push: {
                reviews: review,
            },
        },
        { new: true }
    );

    const serializedProductReviews = product.reviews.map((review: any) => {
        return {
            ...review.toJSON({ flattenObjectIds: true }),
            date: review.date.toString(),
        };
    });

    return serializedProductReviews;
};
