import { FormEvent, useRef } from "react";
import { Col, Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { postProduct } from "../../services/products";

import IProduct from "../../models/IProduct";

const AddProduct = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const addProduct = async (event: FormEvent) => {
        event.preventDefault(); // stop browser form submission

        // extract form values
        const product = {
            title: titleRef.current?.value,
            price: priceRef.current?.value,
            description: descriptionRef.current?.value,
            category: categoryRef.current?.value,
            image: imageRef.current?.value,
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
                            ref={titleRef}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="price">
                    <Form.Label column sm="2">
                        Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" ref={priceRef} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="description">
                    <Form.Label column sm="2">
                        Description
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" ref={descriptionRef} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="category">
                    <Form.Label column sm="2">
                        Catgeory
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select aria-label="Category" ref={categoryRef}>
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
                        <Form.Control type="url" ref={imageRef} />
                    </Col>
                </Form.Group>

                <Button type="submit">Add</Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
