"use client";

import { useState, useEffect } from 'react';
import { IProduct } from "@/types/Product";
import ProductListItem from "./item/item";
import { getProducts } from "@/services/products";
import { useProducts } from "@/hooks/useProducts";

type Props = {
    count: number;
    page: number;
    products: IProduct[];
};

const ProductsList = ({ products, count, page }: Props) => {
    const [actualPage, setActualPage] = useState(page);
    const [actualCount, setActualCount] = useState(count);
    const [actualProducts, setActualProducts] = useState(products);

    const { data, isLoading, error } = useProducts(actualPage);

    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (actualPage !== page && data?.message) {
            setActualProducts(data.message.products);
            setActualCount(data.message.count);
        }
    }, [actualPage, data, page]);

    const totalPages = Math.ceil(actualCount / 10);

    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">List of products</h1>
            <hr className="border-b border-gray-300 mb-6" />

            {/* Pagination Controls */}
            <div className="flex justify-center mb-6">
                <nav className="inline-flex rounded-md shadow-sm">
                    {[...Array(totalPages)].map((_, idx) => {
                        const pageNumber = idx + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setActualPage(pageNumber)}
                                className={`px-4 py-2 border text-sm ${
                                    actualPage === pageNumber
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Loading Spinner */}
            {isLoading && (
                <div className="flex justify-center my-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" />
                </div>
            )}

            {/* Error Snackbar */}
            {showError && error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 max-w-xl mx-auto">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error.message}</span>
                    <button
                        onClick={() => setShowError(false)}
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    >
                        <svg
                            className="fill-current h-6 w-6 text-red-700"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <title>Close</title>
                            <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 001.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
                        </svg>
                    </button>
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
                    {
                        actualProducts.map((product) => (
                            <div key={product._id} className="flex items-stretch">
                                <ProductListItem
                                    product={product}
                                />
                            </div>
                        ))
                    }
                </div>
            )}
        </>
    );
};

export default ProductsList;