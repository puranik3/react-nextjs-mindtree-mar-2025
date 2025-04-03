import type { Metadata } from "next";
// import { notFound } from "next/navigation";

import ProductsList from "@/components/products-list/products-list";
import { getProducts } from "@/data/services/products";
import type { IProduct } from "@/types/Product";

export const metadata : Metadata = {
  title: "List of products",
  description: "Mantra Store - search through our variety of products.",
};

export default async function ProductsPage() {
  const { count, page, products }: {
    count: number;
    page: number;
    products: IProduct[];
  } = await getProducts();

  return <ProductsList
      products={products}
      count={count}
      page={page}
    />;

}