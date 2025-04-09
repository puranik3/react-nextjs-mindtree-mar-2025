'use client';

import { IProduct } from "@/types/Product";
import Link from "next/link";
import Image from "next/image";
import { FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "@/context/shopping-cart";
import { useSession } from "next-auth/react";

import classes from "./item.module.scss";

type Props = {
    product: IProduct;
};

const getBgColor = (category: IProduct["category"]) => {
    const categoryBgColorMap = {
        "men's clothing": "bg-olive-600",
        "women's clothing": "bg-blue-600",
        jewelery: "bg-yellow-600",
        electronics: "bg-gray-600",
    };

    return categoryBgColorMap[category] || "bg-gray-400";
};

const ProductListItem = ({ product }: Props) => {
    const { changeQuantity } = useCart();

    // get session information using useSession(), and maintain the data in state
    const { data: session, status } = useSession();
    const loading = status === "loading";

    return (
        <div className="`flex flex-col w-full rounded-md shadow-md overflow-hidden border bg-white ${classes.category__container}`">
            {/* Category Tag */}
            <div
                className={`text-white text-sm px-3 py-1 ${
                    classes.category
                } ${getBgColor(product.category)}`}
            >
                {product.category}
            </div>

            {/* Image */}
            <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={192}
                className="w-full h-48 object-contain p-4"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
            />

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-medium mb-3 truncate">
                    {product.title}
                </h3>

                <div className="flex items-center gap-2 text-sm mb-4">
                    <span title={product.rating.rate.toFixed(2)}>
                        ⭐ {product.rating.rate.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                        ({product.rating.count} ratings)
                    </span>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                    <strong>Price:</strong> ${product.price}
                </p>
            </div>

            {/* Actions */}
            <div className="px-4 py-2 flex items-center justify-between border-t">
                <button
                    aria-label="share"
                    className="text-gray-600 hover:text-gray-900 transition"
                >
                    <FaShareAlt />
                </button>

                {
                    session && !loading && (
                        <button
                            aria-label="add to cart"
                            onClick={() => changeQuantity(product._id, 1)}
                            className="text-gray-700 hover:text-gray-900 p-2 rounded"
                        >
                            <FaShoppingCart className="text-xl" />
                        </button>
                    )
                }

                <Link
                    href={`/products/${product._id}`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                >
                    KNOW MORE
                </Link>
            </div>
        </div>
    );
};

export default ProductListItem;