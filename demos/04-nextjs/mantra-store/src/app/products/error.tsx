'use client';

// The error object passed by Next.js often includes a digest (a hashed error signature for debugging)
interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: Props) {
  console.error("Page error:", error);

  return (
    <div>
      <h2>Something went wrong.</h2>
      <hr />

      <p>{error.message}</p>
      <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition" onClick={() => {
        if (typeof window !== 'undefined') {
          location.reload(); // fallback full reload
        } else {
          reset(); // still try this first
        }
      }}>Try again</button>
    </div>
  );
}