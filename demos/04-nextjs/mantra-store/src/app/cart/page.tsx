import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Cart from "@/components/cart/cart";
import { getCart } from "@/data/services/cart";

export const metadata = {
  title: "Shopping cart | Mantra Store",
  description: "Shopping cart",
};

export default async function CartPage() {
  const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     redirect("/auth"); // App Router's redirect (works like useRouter.push on server)
//   }

  const email = session?.user.email;
  const cart = await getCart(email || "");

  return <Cart cart={cart} />;
}