import { IProduct } from "@/types/Product";

type Props = {
    count: number;
    page: number;
    products: IProduct[];
};

const ProductsList = ({ products, count, page }: Props) => {
    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">List of products</h1>
            <hr className="border-b border-gray-300 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
                {
                    products.map((product) => (
                        <div key={product._id} className="flex items-stretch">
                            <div>{product.title}</div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default ProductsList;