"use client";

import { useProduct } from "@/context/product-context";
import { IReview } from "@/types/Product";

const ProductReviews = () => {
    const { product } = useProduct();

    const reviews = product?.reviews as IReview[];

    if (!reviews || reviews.length === 0) {
        return <p>No reviews yet. Be the first one to add a review!</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <ul className="space-y-6">
                {reviews.map((review) => (
                    <li key={review._id} className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            {review.username.substring(0, 1).toUpperCase()}
                        </div>

                        {/* Review content */}
                        <div className="flex-1 space-y-2">
                            <div className="text-sm text-gray-500">
                                {new Date(review.date)
                                    .toDateString()
                                    .substring(0, 10)}
                            </div>

                            {/* Simple rating stars using emoji (or swap with custom SVG if desired) */}
                            <div className="flex items-center text-yellow-500 text-sm">
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </div>

                            <p className="text-gray-800">{review.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductReviews;