import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { Navigate, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Menu from "./components/common/Menu/Menu";
import HomePage from "./pages/home";
import WorkshopsListPage from "./pages/workshops";
import AddWorkshopPage from "./pages/workshops/add";
import WorkshopDetailsPage from "./pages/workshops/[id]";
import FavoritesPage from "./pages/workshops/favorites";
import NotFoundPage from "./pages/not-found";

import { Theme, ThemeContext } from './contexts/ThemeContext';

import './App.scss';

function App() {
    const [show, setShow] = useState(true);

    // we will share these through Context API
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => {
        setTheme(t => t === 'light' ? 'dark' : 'light');
    }

    // Step 1: Gather the data / methods to be shared across the app into an object
    const value = {
        // value: theme
        value: theme,
        textValue: theme === 'light' ? 'dark' as Theme : 'light' as Theme,
        toggleTheme
    }

    // Step 2: Pass the data through Context API
    return (
        <ThemeContext.Provider value={value}>
            <Alert
                variant="warning"
                onClose={() => setShow(false)}
                dismissible
            >
                <Alert.Heading>Note on React Version</Alert.Heading>
                <p>
                    The current version of React is v19. This app is built
                    using React v18. The way an app was built using React
                    v16.7 or earlier was significantly different.
                </p>
            </Alert>

            <Menu />

            {/* We want to show components bsed on the URL */}
            <Container className="my-4">
                <Routes>
                    <Route
                        path="/home"
                        element={<Navigate to="/" />}
                    />
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/workshops"
                        element={<WorkshopsListPage />}
                    />
                    <Route
                        path="/workshops/add"
                        element={<AddWorkshopPage />}
                    />
                    <Route
                        path="/workshops/favorites"
                        element={<FavoritesPage />}
                    />
                    <Route
                        path="/workshops/:id/*"
                        element={<WorkshopDetailsPage />}
                    />
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />
                </Routes>
            </Container>

            <ToastContainer
                position="top-right"
                autoClose={5000}
            />
        </ThemeContext.Provider>
    );
}

export default App;
