import AddProduct, { AddProductFormData } from "./add-product";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AllProviders from "../../test-utils/AllProviders";

const newProduct: AddProductFormData = {
    title: "New product",
    price: 100,
    description: "New product in Mantra Store",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
};

let titleInput: HTMLElement;
let priceInput: HTMLElement;
let descriptionInput: HTMLElement;
let categoryInput: HTMLElement;
let imageInput: HTMLElement;
let submitButton: HTMLElement;

const setup = () => {
    render(
        <AllProviders url="/products/add" path="/products/add">
            <AddProduct />
        </AllProviders>
    );

    titleInput = screen.getByLabelText(/Title/i);
    priceInput = screen.getByLabelText(/Price/i);
    descriptionInput = screen.getByLabelText(/Description/i);
    categoryInput = screen.getByLabelText(/Category/i);
    imageInput = screen.getByLabelText(/Image/i);

    submitButton = screen.getByRole("button", { name: /Add product/i });

    // may be this is not needed since we render in each test afresh...
    userEvent.clear(titleInput);
    userEvent.clear(priceInput);
    userEvent.clear(descriptionInput);
    userEvent.selectOptions(categoryInput, "");
    userEvent.clear(imageInput);
};

const fillAndSubmit = (product: AddProductFormData = newProduct) => {
    userEvent.type(titleInput, product.title);
    userEvent.type(priceInput, product.price.toString());
    userEvent.type(descriptionInput, product.description || "");
    userEvent.type(categoryInput, product.category);
    userEvent.type(imageInput, product.image);

    userEvent.click(submitButton);
};

describe("AddProduct form on submit (invalid inputs)", () => {
    test("should display error message when title input is not provided", async () => {
        setup();

        fillAndSubmit({
            ...newProduct,
            title: "",
        });

        const errorMessageEl = await screen.findByText(/Title is required/i);
        expect(errorMessageEl).toBeInTheDocument();
    });

    test("should add a new product when all inputs are valid and the form is submitted", async () => {
        setup();

        fillAndSubmit(newProduct);

        expect(
            screen.queryByText(/Title is required/i)
        ).not.toBeInTheDocument();
        // ...similarly we check if all other error messages DO NOT appear...

        // you can also check if the success message appears
        // const successMessageEl = await screen.findByText(
        //     /Session has been added and assigned id = 6/
        // );
        // expect(successMessageEl).toBeInTheDocument();
    });

    // ..and more tests
});
