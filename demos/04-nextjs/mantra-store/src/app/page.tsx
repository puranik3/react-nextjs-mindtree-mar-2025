/**
 * This HomePage component is a server component (by default a component is a server component - rendered on the server side)
 *
 * The code is not part of the JS bundle sent to the client
 */
import Home from "@/components/home/home";
import type { Metadata } from "next";

// generateMetadata() function can be used instead for dynamic pages
export const metadata : Metadata = {
  title: "Mantra Store",
  description:
    "Mantra Store - shop from our wide variety of products. Have them delivered within 2 hours at your doorstep.",
};

export default function HomePage() {
    return (
        <>
            <Home />
        </>
    );
}