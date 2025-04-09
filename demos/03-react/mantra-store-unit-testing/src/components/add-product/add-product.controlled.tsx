import { FormEvent, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { postProduct } from "../../services/products";

import IProduct from "../../models/IProduct";

const AddProduct = () => {
    const theme = useSelector((state: any) => state.value);

    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const addProduct = async (event: FormEvent) => {
        event.preventDefault(); // stop browser form submission

        const product = {
            title,
            price: +price,
            description,
            category,
            image,
        } as Omit<IProduct, "_id" | "rating">;

        // console.log(product);

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
            <Form onSubmit={addProduct}>
                <Form.Group as={Row} className="mb-3" controlId="title">
                    <Form.Label column sm="2">
                        Title
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            placeholder="Parle G"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="price">
                    <Form.Label column sm="2">
                        Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="description">
                    <Form.Label column sm="2">
                        Description
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="category">
                    <Form.Label column sm="2">
                        Catgeory
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select
                            aria-label="Category"
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >
                            <option>Open this select menu</option>
                            <option value="men's clothing">
                                Men's clothing
                            </option>
                            <option value="women's clothing">
                                Women's clothing
                            </option>
                            <option value="jewellery">Jewellery</option>
                            <option value="electronics">Electronics</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="image">
                    <Form.Label column sm="2">
                        Image
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="url"
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button type="submit" variant={theme}>
                    Add
                </Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
