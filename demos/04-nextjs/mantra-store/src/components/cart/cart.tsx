'use client';

import { useCart } from "@/context/shopping-cart";
import { ICartItem } from "@/types/Cart";
import { IProduct } from "@/types/Product";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";

type Props = {
    cart: ICartItem[];
};

function Cart({ cart }: Props) {
    const { changeQuantity } = useCart();

    if (!cart || cart.length === 0) {
        return (
            <div className="flex justify-center items-center px-4 py-8 text-gray-600">
                Cart is empty
            </div>
        );
    }

    const total = cart.reduce(
        (acc, item) => acc + (item.product as IProduct).price * item.quantity,
        0
    );

    return (
        <section className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold mb-4">Shopping cart</h1>
            <hr className="mb-6 border-gray-300" />

            <div className="overflow-x-auto rounded shadow border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 border-b">
                        <tr className="text-sm font-medium text-gray-700 text-left">
                            <th className="py-3 px-4 text-center">S. No.</th>
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4 text-center">Quantity</th>
                            <th className="py-3 px-4 text-right">Price ($)</th>
                            <th className="py-3 px-4 text-right">
                                Total Price ($)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(({ product, quantity }: any, idx: number) => (
                            <tr
                                key={product._id}
                                className="border-b hover:bg-gray-50 text-sm"
                            >
                                <td className="py-3 px-4 text-center">
                                    {idx + 1}
                                </td>
                                <td className="py-3 px-4">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={48}
                                        height={48}
                                    />
                                </td>
                                <td className="py-3 px-4">{product.title}</td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        aria-label="decrease quantity"
                                        className="text-green-600 hover:text-green-800 mr-2"
                                        onClick={async () => {
                                            await changeQuantity(
                                                product._id,
                                                -1
                                            );
                                            window.location.reload();
                                        }}
                                    >
                                        <FaMinus />
                                    </button>
                                    {quantity}
                                    <button
                                        aria-label="increase quantity"
                                        className="text-green-600 hover:text-green-800 ml-2"
                                        onClick={async () => {
                                            await changeQuantity(
                                                product._id,
                                                1
                                            );
                                            window.location.reload();
                                        }}
                                    >
                                        <FaPlus />
                                    </button>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    {product.price.toFixed(2)}
                                </td>
                                <td className="py-3 px-4 text-right">
                                    {(quantity * product.price).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-gray-50 text-sm font-medium text-gray-700 border-t">
                            <td colSpan={4} />
                            <td className="py-3 px-4 text-right">Total</td>
                            <td className="py-3 px-4 text-right">
                                {total.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}

export default Cart;