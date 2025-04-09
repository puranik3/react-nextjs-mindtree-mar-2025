import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme";

import { postProduct } from "../../services/products";

import IProduct from "../../models/IProduct";
import { RootState } from "../../store";

export type AddProductFormData = Omit<IProduct, "_id" | "rating">;

const AddProduct = () => {
    // const theme = useSelector((state: RootState) => state.theme.value);
    const { theme } = useContext(ThemeContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddProductFormData>({
        mode: "all",
    });

    const addProduct = async (values: AddProductFormData) => {
        const product = {
            ...values,
            price: +values.price,
        };

        console.log(product);

        try {
            const createdProduct = await postProduct(product);
            alert(
                `Product with title ${createdProduct.title} and id = ${createdProduct._id} has been created`
            );
        } catch (error) {
            alert((error as Error)?.message);
        }
    };

    return (
        <Container>
            <h1>Add a product</h1>
            <Form onSubmit={handleSubmit(addProduct)} noValidate>
                <Form.Group as={Row} className="mb-3" controlId="title">
                    <Form.Label column sm="2">
                        Title
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            placeholder="Parle G"
                            {...register("title", {
                                required: true,
                                minLength: 8,
                            })}
                        />
                        {
                            /* errors.title is null if no error, else it is an object */
                            errors.title && (
                                <small className="text-danger">
                                    {errors.title.type === "required" &&
                                        "Title is required"}
                                    {errors.title.type === "minLength" &&
                                        "Title must have at least 8 characters"}
                                </small>
                            )
                        }
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="price">
                    <Form.Label column sm="2">
                        Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            {...register("price", {
                                required: true,
                                pattern: /^\d+$/,
                            })}
                        />
                        {errors.price && (
                            <small className="text-danger">
                                {errors.price.type === "required" &&
                                    "Price is required"}
                                {errors.price.type === "pattern" &&
                                    "Price must be a positive number"}
                            </small>
                        )}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="description">
                    <Form.Label column sm="2">
                        Description
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            as="textarea"
                            {...register("description", {
                                required: true,
                            })}
                        />
                        {errors.description && (
                            <small className="text-danger">
                                {errors.description.type === "required" &&
                                    "Description is required"}
                            </small>
                        )}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="category">
                    <Form.Label column sm="2">
                        Category
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select
                            aria-label="Category"
                            {...register("category", {
                                required: true,
                            })}
                        >
                            <option value="">Open this select menu</option>
                            <option value="men's clothing">
                                Men's clothing
                            </option>
                            <option value="women's clothing">
                                Women's clothing
                            </option>
                            <option value="jewelery">Jewellery</option>
                            <option value="electronics">Electronics</option>
                        </Form.Select>
                        {errors.category && (
                            <small className="text-danger">
                                {errors.category.type === "required" &&
                                    "Category is required"}
                            </small>
                        )}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="image">
                    <Form.Label column sm="2">
                        Image
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="url"
                            {...register("image", {
                                required: true,
                            })}
                        />
                        {errors.image && (
                            <small className="text-danger">
                                {errors.image.type === "required" &&
                                    "Image is required"}
                            </small>
                        )}
                    </Col>
                </Form.Group>

                <Button type="submit" variant={theme}>
                    Add product
                </Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
