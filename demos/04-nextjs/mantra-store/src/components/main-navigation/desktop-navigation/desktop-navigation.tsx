import Link from "next/link"

export default function DesktopNavigation() {
    return (
        <nav className="hidden md:flex gap-6">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/products/add" className="hover:underline">
            Add a Product
          </Link>
        </nav>
    )
}