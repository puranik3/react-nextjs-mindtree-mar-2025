import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";

import IProduct from "../../../models/IProduct";

import classes from "./product-list-item.module.scss";
import { RootState } from "../../../store";

type Props = {
    product: IProduct;
};

const getBadgeClass = (category: IProduct["category"]) => {
    const categoryBadgeClassMap = {
        "men's clothing": "primary",
        "women's clothing": "secondary",
        jewelery: "warning",
        electronics: "danger",
    };

    return categoryBadgeClassMap[category];
};

const ProductsListItem = ({ product }: Props) => {
    // useSelector is a hook provided by react-redux that allows you to extract data from the Redux store state, using a selector function. It also results in subscription of the component to the Redux store, and it will re-render the component each time when the state changes.
    const theme = useSelector((state: RootState) => state.theme.value);

    return (
        <Card
            className={"w-100 py-3 px-1 " + classes.card}
            bg={theme}
            text={theme === "light" ? "dark" : "white"}
        >
            <div style={{ height: "120px" }} className="d-flex">
                <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    className={"w-50 d-block mx-auto " + classes.card__image}
                />
            </div>
            <Card.Body>
                <Card.Title className={"h6 mb-0 " + classes.card__title}>
                    {product.title}
                </Card.Title>
                <Badge
                    bg={getBadgeClass(product.category)}
                    className={classes.card__category__badge}
                >
                    {product.category}
                </Badge>
                <div>
                    <strong>Price</strong>: ${product.price}
                </div>
                <div title={product.rating.rate.toFixed(2)}>
                    <Rating
                        initialValue={product.rating.rate}
                        size={20}
                        readonly
                    />{" "}
                    ({product.rating.count} people rated)
                </div>
                <Link
                    className="primary mt-3 btn btn-primary btn-sm"
                    to={`/products/${product._id}`}
                >
                    Know more
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ProductsListItem;
