import { z } from "zod";

export const ReviewSchema = z.object({
    rating: z
        .number({
            required_error: "Rating is required",
            invalid_type_error: "Rating must be a number",
        })
        .min(0, "Please select at least 0 star")
        .max(5, "Rating cannot exceed 5 stars"),

    text: z
        .string({
            required_error: "Review text is required",
        })
        .min(20, "Review must be at least 20 characters"),
});

export type ReviewInput = z.infer<typeof ReviewSchema>;