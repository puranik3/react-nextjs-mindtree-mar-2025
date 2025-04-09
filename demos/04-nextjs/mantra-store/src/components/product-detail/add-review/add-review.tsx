'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { postReview } from '@/services/reviews';
import { useProduct } from '@/context/product-context';
import { addReviewAction } from '@/actions/reviews';

const AddReview = () => {
  const { productId, updateReviews } = useProduct();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleAddReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (typeof productId === 'string') {
        // const reviews = await postReview(productId, { rating, text });
        // updateReviews(reviews.message);
        startTransition(
          async () => {
            const reviews = await addReviewAction(productId, { rating, text });
            updateReviews(reviews);
            router.push(`/products/${productId}`);
          }
        );
      }
    } catch (error) {
      alert(`Failed to add review: ${(error as Error).message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow max-w-xl mx-auto my-8">
      <h2 className="text-lg font-semibold text-gray-800">Add a review</h2>
      <hr className="my-4 border-gray-300" />

      <form onSubmit={handleAddReview} className="space-y-4">
        {/* Star Rating */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-2xl ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
              aria-label={`${star} star`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Text Field */}
        <div>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`bg-blue-600 text-white font-medium py-2 px-4 rounded transition ${
              isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Add review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;