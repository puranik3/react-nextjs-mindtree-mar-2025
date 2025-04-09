import ProductDetail from "../../../components/product-detail/product-detail";
import { useParams } from "react-router-dom";

type Params = {
    _id: string;
};

const ProductDetailPage = () => {
    const params = useParams<Params>();
    const _id = params._id as string;

    return <ProductDetail _id={_id} />;
};

export default ProductDetailPage;
