import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import HomePage from "./pages";
import ProductsPage from "./pages/products";
import MainNavigation from "./components/main-navigation/main-navigation";
import AddProductPage from "./pages/products/add";
import ProductDetailPage from "./pages/products/[_id]";

function App() {
    return (
        <div>
            <MainNavigation />

            <Container className="my-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route
                        path="/products/:_id"
                        element={<ProductDetailPage />}
                    />
                    <Route path="/products/add" element={<AddProductPage />} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;
