import { IProduct } from "@/types/Product";
import Image from "next/image";

type Props = {
    productId: string | undefined;
    product: IProduct;
};

const ProductDetail = ({ productId, product }: Props) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Image Section */}
                <div className="flex justify-center p-4">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={320}
                        height={240}
                        className="object-contain"
                    />
                </div>

                {/* Content Section */}
                <div className="md:col-span-2 space-y-4">
                    <h1 className="text-3xl font-semibold">{product.title}</h1>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span title={product.rating.rate.toFixed(2)}>
                            ⭐ {product.rating.rate.toFixed(1)}
                        </span>
                        <span>({product.rating.count} people rated)</span>
                    </div>

                    <p className="text-lg text-gray-800">
                        <strong>Price:</strong> ${product.price}
                    </p>

                    <p className="text-gray-700">{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;