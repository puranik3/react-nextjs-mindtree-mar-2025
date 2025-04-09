import { Row, Col, Alert, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";

import IProduct from "../../models/IProduct";
import ProductsListItem from "./item/products-list-item";

type Props = {
    initialPage: number /*| string*/;
};

const ProductsList = ({ initialPage }: Props) => {
    const [page, setPage] = useState(initialPage);
    const [hasNextPage, setHasNextPage] = useState(true);

    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const previousPage = () => {
        setPage((p) => (p > 1 ? p - 1 : p)); // new state depends on the current state
    };

    const nextPage = () => {
        if (!hasNextPage) return;

        setPage((p) => p + 1); // new state depends on the current state
    };

    useEffect(() => {
        const helper = async () => {
            setLoading(true);

            try {
                const data = await getProducts(page);
                setProducts(data.products);
                setHasNextPage(data.count >= data.page * 10); // page size is 10
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        helper();
    }, [page]);

    // const els = products.map()

    return (
        <>
            <h1>List of products</h1>
            <div className="mb-4">
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={previousPage}
                    disabled={loading || error !== null || page === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={nextPage}
                    disabled={loading || error !== null || !hasNextPage}
                >
                    Next
                </Button>
            </div>
            {loading && (
                <div className="text-center" data-testid="loading-message">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">
                            Loading page {page} of products
                        </span>
                    </Spinner>
                    <div>Loading page {page} of products</div>
                </div>
            )}
            {error && (
                <Alert
                    variant="danger"
                    data-testid="error-message"
                    role="alert"
                >
                    {error.message}
                </Alert>
            )}
            {!loading && !error && (
                <>
                    <div className="mb-4">You are viewing Page {page}</div>
                    <Row xs={1} md={2} lg={3} xl={4}>
                        {products.map((product) => (
                            <Col key={product._id} className="my-2 d-flex">
                                <ProductsListItem product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
            {/* this renders an array of React elements - every element in the array is rendered */}
        </>
    );
};

export default ProductsList;
