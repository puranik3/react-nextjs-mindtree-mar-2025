import Link from "next/link"

export default function Logo() {
    return (
        <Link href="/" className="text-mxl font-bold tracking-wide hidden uppercase md:block">
          Mantra
        </Link>
    );
}