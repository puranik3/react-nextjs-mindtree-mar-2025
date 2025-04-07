"use client";

import { useProduct } from "@/context/product-context";
import { IReview } from "@/types/Product";
import { useRouter } from "next/navigation";

const ProductReviews = () => {
    // #1: Extract reviews from context (shared in the product details layout.tsx)
    // #4: Extract productId as well
    const { product, productId } = useProduct();

    const reviews = product?.reviews as IReview[];

    // #5: Add this...
    const router = useRouter();

    // #7: Button click handler - redirect user to add review page
    const navigateToAddReview = () => {
        router.push(`/products/${productId}/addreview`);
    };

    // #2: UI if no reviews present for the product
    if (!reviews || reviews.length === 0) {
        return (
            <>
                <p>No reviews yet. Be the first one to add a review!</p>
                <button
                    onClick={navigateToAddReview}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded my-8"
                >
                    Add Review
                </button>
            </>
        );
    }

    // #3 UI if reviews present for the product - show list of reviews
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            {/* $6: Set the UI for button navigation */}
            <button
                onClick={navigateToAddReview}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded my-8"
            >
                Add Review
            </button>
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