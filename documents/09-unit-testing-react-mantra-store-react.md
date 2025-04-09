# Unit Testing React apps using Jest and React Testing Library (RTL)

## References

-   [Jest](https://jestjs.io/docs/getting-started) is the JS unit test library and test runner. It is used to set up test.
-   [Testing Library](https://testing-library.com/docs/) (the core library), and [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro) is used to render components in the test environment, query for elements, and set up expectations.
-   Testing Library is usually used along with [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) for the range of matchers it provides.
-   Again Testing Library is usually used along with [user-event](https://testing-library.com/docs/user-event/intro) for event handling behavior most similar to the way it happens in browsers.

## Step 1: Install the necessary libraries

-   Create react App (CRA) apps come pre-installed with Jest and RTL.

```json
"dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
},
```

-   We need to add Mock Service worker (msw) - the latest version 2 has bugs and is in general NOT recommended by many teams (please check the problems with some research).

```
npm i --save-dev msw@1.x
```

-   You can find it mentioned in `devDependencies`. Even the other testing-related libraries should ideally be mentioned as `devDependencies` but CRA adds it as `dependencies` at the time of setup.

```json
"devDependencies": {
    "msw": "^1.3.3"
},
```

## Step 2: Set up a simple unit test

-   `src/components/products-list/products-list.test.tsx` - We create a test file for every component / service etc. that we want to test. Create the file as mentioned. Add the following code. This is a trivial test that tests true is equal to true! - what a revelation :D You can group as many tests inside a describe block (to create a test suite that is used to group tests). You can nest describe blocks, and have as many describe blocks as well.

```tsx
describe("ProductsList on load", () => {
    test("should show a loading message when the component first renders", () => {
        expect(true).toBe(true);
    });
});
```

-   `package.json` - For the import of `axios` (made from the service method imported in the `ProductsList` component) to work within the Node JS-based test environment we should also add the following Jest configuration.

```json
"jest": {
    "transformIgnorePatterns": [
        "node_modules/(?!axios)"
    ]
}
```

-   To run the test, issue this command from the project folder

```
npm run test
```

-   You will find the test passes. The test runs is watch mode and hence runs, shows the results, and presents a menu. This menu can be used to selectively run tests (Jest by default runs the tests related to the code changes made since the last Git commit). Explore it.

## Step 3: Add Jest DOM at test startup

-   `src/setupTests.ts` - Jest DOM adds useful matchers like `toBeInTheDocument` etc. that we shall use. It needs to be set up to run before the tests run. CRA provides a `src/setupTests.ts` file that runs before tests run. We simply need to import Jest DOM in it. Similarly any code that should run before the tests run is added in this file.

```ts
import "@testing-library/jest-dom";
```

## Step 4: Set up the AllProviders test utility component

-   Components that we render in the app are rendered by the Router. BrowserRouter provides access to route information to components using `useParams()` and other React Router custom hooks. These calls will fail if the component is not nested in a Router. During testing we usually use MemoryRouter (BrowserRouter may not be suitable for all cases). This needs us to also setup the route path on which the component should render (just the way it is given in the Route component in the application), and also the url as a prop to the MemoryRouter (this simulates the browser address bar's url - i.e. the window location). Similarly `useDispatch`, `useSelector` etc. would work only when the component is nested inside of the Redux Store Provider.
-   `src/test-utils/AllProviders.tsx` - Create `AllProviders` component that renders the child component passed, nested inside the Router and Redux Store providers.

```tsx
import { ReactNode } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

type Props = {
    children: ReactNode;
    url: string;
    path: string;
};

const AllProviders = ({ children, url, path }: Props) => {
    // initialEntries sets up the router history (like browser history) - we have configured it with only 1 page (the current page) in history.
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={[url]}>
                <Routes>
                    <Route path={path} element={children} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

export default AllProviders;
```

## Step 5: Render the ProductsList component and set up the loading state test

-   `src/components/products-list/products-list.test.tsx`

```tsx
import ProductsList from "./products-list";

import { render, screen } from "@testing-library/react";
import AllProviders from "../../test-utils/AllProviders";

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
});
```

-   `src/components/products-list/products-list.tsx` - Add the `data-testid` to the loading Spinner's container

```tsx
{
    loading && (
        <div className="text-center" data-testid="loading-message">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">
                    Loading page {page} of products
                </span>
            </Spinner>
            <div>Loading page {page} of products</div>
        </div>
    );
}
```

-   Run the test. It should pass.

```
npm run test
```

## Step 6: Set up API service mocks using Mock Service Worker (msw)

-   The `ProductsList` component makes an API call on load to fetch products, and shows the list / error message on success / failure. The backend API is a dependency and this requires us to mock the call to the backend (ideally in a unit test we need to mock out the frontend service method, but we generally take a relaxed approach of mocking the backend). A good way to achieve API mocking is using the Mock Service Worker (msw) library - we have already installed this (msw version 1).
-   MSW sets up a "service worker" in Node JS environment. Service workers help you intercept HTTP request and response. This library will help setup a service worker that shall intercept HTTP requests from the Mantra Store app and send a mock response. Your requests will consequently never reach the actual server.
-   `src/mocks/data/*` - add mock data by copying this folder from the supplied files (it is already added to `mantra-store-unit-testing/` folder for convenience) in the repository.

```
- src/mocks/data/
    - product-detail.json
    - products-page-1.json
    - products-page-2.json
```

-   `src/mocks/handlers.ts` - Set up the API handlers - handlers intercept specific HTTP requests and send the mock response. Read more about them in MSW documentation. We set up the handler for `/products`, `/products?page=1` and `/products?page=2` API.

```ts
import { rest } from "msw";

import productsPage1 from "./data/products-page-1";
import productsPage2 from "./data/products-page-2";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const handlers = [
    rest.get(`${baseUrl}/products`, (req, res, ctx) => {
        const page = req.url.searchParams.get("page");

        console.log("page = ", page);

        if (page === "1") {
            return res(
                ctx.status(200),
                ctx.set("Content-Type", "application/json"),
                ctx.json(productsPage1)
            );
        }

        if (page === "2") {
            return res(
                ctx.status(200),
                ctx.set("Content-Type", "application/json"),
                ctx.json(productsPage2)
            );
        }

        return res(
            ctx.status(200),
            ctx.set("Content-Type", "application/json"),
            ctx.json(productsPage1)
        );
    }),
];
```

-   `.env` - Make sure you have the `.env` file in the project folder with the REACT_APP_API_BASE_URL variable configured.

```
PORT=3000
REACT_APP_BASE_URL=
REACT_APP_API_BASE_URL=https://mantra-server-nzl2.onrender.com/api
```

-   `src/mocks/server.ts` - Create a Mock server that intercepts and serves mock responses based off of the handlers.

```ts
import "./setup.ts";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

export default server;
```

-   `src/mocks/setup.ts` - MSW fails to work on latest Node (v20.x.x) due to a missing API. Add a polyfill for it.

```ts
import { TextEncoder } from "node:util";

global.TextEncoder = TextEncoder;
```

-   `src/setupTests.ts` - Add this to the test setup file. This makes sure the mock server runs before the tests run, shuts down after the tests run, and resets mocks after **every** test runs (we will see how to change the mock handlers for tests when we test if our component can handle error responses - there resetting mock after the test would be needed)

```ts
import "@testing-library/jest-dom";
import server from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Step 7: Add a unit test to check if the component is able to show the list of products fetched at the time of load

-   `src/components/products-list/products-list.test.tsx` - We add a unit test to check if the component is able to show the list of products fetched at the time of load. We also make sure the loading spinner does not show once the products are fetched and rendered.
-   Add the necessary imports

```tsx
import productsPage1Data from "../../mocks/data/products-page-1";
```

-   Add the new test to the existing test suite (`describe` block)

```tsx
describe("ProductsList on load", () => {
    // the loading spinner test
    // old code...

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
});
```

-   Run the test. It should pass.

## Step 8: Add a unit test to check if the component is able to show an error message if products could not be fetched at the time of load

-   `src/mocks/handlers.ts` - We need to send an error response when the component makes a call to `/products?page=1`. For this we need to have or server use a different hanlder for this API. We first create this handler.

```tsx
// configure failure responses
export const errorHandlers = [
    rest.get(`${baseUrl}/products`, (req, res, ctx) => {
        return res(ctx.status(500));
    }),
];
```

-   `src/components/products-list/products-list.test.tsx` - We add a unit test to check if the component is able to show an error message if products could not be fetched at the time of load. We also make sure the loading spinner does not show once the error message is rendered.
-   Add the necessary imports (the error handler and the mock server)

```tsx
import server from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";
```

-   Add the new test to the existing test suite (`describe` block). Note how the server is set up to use the error handlers for this test. Note that the server will automatically be reset to use the original handlers after this test because of the setup in `setupTests.ts`.

```tsx
describe("ProductsList on load", () => {
    // the loading spinner, products list (success) tests
    // old code...

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
```

-   Run the test. It should pass.

## Step 9: Add pagination test

-   `src/components/products-list/products-list.test.tsx` - We add the pagination functionality test (next button click). A similar test for previous button click can be set up (but it will be little more involved, and hence left out of this tutorial).
-   Add the necessary imports (the error handler and the mock server)

```tsx
import userEvent from "@testing-library/user-event";
import productsPage2Data from "../../mocks/data/products-page-2";
```

```tsx
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
```

-   Run the test. It should pass.

## Step 10: Setup helpers for AddProduct component tests

-   `src/components/add-product/add-product.test.tsx` - We set up some helpers for tests we shall add in this file.
-   Add the necessary imports

```tsx
import AddProduct, { AddProductFormData } from "./add-product";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AllProviders from "../../test-utils/AllProviders";
```

-   Create an object to be used in the unit tests.

```tsx
const newProduct: AddProductFormData = {
    title: "New product",
    price: 100,
    description: "New product in Mantra Store",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
};
```

-   Add a `setup` function that renders the component in the tests, gets handles to various inputs, and clears the add product form.

```tsx
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
```

-   Add a `fillAndSubmit` function that accepts a product (or uses the one we created above as the default), fills the form with the product's details, and submits it.

```tsx
const fillAndSubmit = (product: AddProductFormData = newProduct) => {
    userEvent.type(titleInput, product.title);
    userEvent.type(priceInput, product.price.toString());
    userEvent.type(descriptionInput, product.description || "");
    userEvent.type(categoryInput, product.category);
    userEvent.type(imageInput, product.image);

    userEvent.click(submitButton);
};
```

## Step 11: Add a test that displays an error message when title input is not provided

-   `src/components/add-product/add-product.test.tsx` - We override the title and set it to an empty string (invalid value) while filling the form. The test checks if the appropriate error message is displayed.

```tsx
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
});
```

-   Run the test. It should pass.

## Step 12: Add a test that checks that no error messages are displayed when all inputs have valid values when the form is submitted

-   `src/components/add-product/add-product.test.tsx` - The test checks if no error message is displayed if the inputs have valid text (it dos this check only for the title input - yoou can similarly add for the rest).

```tsx
describe("AddProduct form on submit (invalid inputs)", () => {
    // the previous test
    // old code...

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
});
```
