import ProductsList from "./products-list";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AllProviders from "../../test-utils/AllProviders";

import productsPage1Data from "../../mocks/data/products-page-1";
import productsPage2Data from "../../mocks/data/products-page-2";

import server from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";

describe("ProductsList on load", () => {
    test("should show a loading message when the component first renders", () => {
        // arrange, act
        render(
            <AllProviders path="/products" url="/products">
                <ProductsList initialPage={1} />
            </AllProviders>
        );

        const loadingMessageEl = screen.getByTestId("loading-message");
        expect(loadingMessageEl).toBeInTheDocument();
    });

    test("should show the list of products returned by the server on successfully fetching the products", async () => {
        render(
            <AllProviders path="/products" url="/products">
                <ProductsList initialPage={1} />
            </AllProviders>
        );

        for (let i = 0; i < 10; i++) {
            const el = await screen.findByText(
                productsPage1Data.products[i].title
            );
            expect(el).toBeInTheDocument();
        }

        // Use queryBy*() when you expect the element NOT to be in the DOM currently
        const loadingMessage = screen.queryByTestId("loading-message");
        expect(loadingMessage).not.toBeInTheDocument();
    });

    test("should display an error message on failure when trying fetch products", async () => {
        server.use(...errorHandlers);

        render(
            <AllProviders path="/products" url="/products">
                <ProductsList initialPage={1} />
            </AllProviders>
        );

        const errorMessage = await screen.findByTestId("error-message");
        expect(errorMessage).toBeInTheDocument();

        const loadingMessage = screen.queryByTestId("loading-message");
        expect(loadingMessage).not.toBeInTheDocument();
    });
});

describe("Pagination", () => {
    test("should show the next page of products when next button is clicked", async () => {
        render(
            <AllProviders path="/products" url="/products">
                <ProductsList initialPage={1} />
            </AllProviders>
        );

        const loadingMessageEl = screen.getByTestId("loading-message");
        expect(loadingMessageEl).toBeInTheDocument();

        for (let i = 0; i < 10; i++) {
            const productTitleEl = await screen.findByText(
                productsPage1Data.products[i].title
            );
            expect(productTitleEl).toBeInTheDocument();
        }

        const nextButton = screen.getByRole("button", { name: /^Next$/ });
        userEvent.click(nextButton);

        for (let i = 0; i < 10; i++) {
            const productTitleEl = await screen.findByText(
                productsPage2Data.products[i].title
            );
            expect(productTitleEl).toBeInTheDocument();
        }
    });
});