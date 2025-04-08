import Link from "next/link"
import UserNavigation from "../user-navigation/user-navigation"

export default function DesktopNavigation() {
    return (
        <nav className="hidden md:flex gap-6">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/products/add" className="hover:underline">
            Add a Product
          </Link>

          <UserNavigation />
        </nav>
    )
}