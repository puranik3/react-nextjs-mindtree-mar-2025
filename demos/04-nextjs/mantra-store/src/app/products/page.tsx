import ProductsList from "@/components/products-list/products-list";
import { Metadata } from 'next';

export const metadata : Metadata = {
  title: "List of products",
  description: "Mantra Store - search through our variety of products.",
};

export default function ProductsPage() {
  return <ProductsList />;
}