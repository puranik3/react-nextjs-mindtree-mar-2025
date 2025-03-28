import { Alert, Container } from "react-bootstrap";
import { Navigate, Routes, Route } from "react-router-dom";
// import Container from "react-bootstrap/Container";
import Menu from "./components/common/Menu/Menu";
// import Home from './components/Home/Home';
import HomePage from "./pages/page";
import WorkshopsListPage from "./pages/workshops/page";
import AddWorkshopPage from "./pages/workshops/add/page";
import FavoritesPage from "./pages/workshops/favorites/page";
import NotFoundPage from "./pages/not-found";

import "./App.scss";

interface Props {
    title?: string;
    color?: string;
}

export default function App({ title, color = "gray" }: Props) {
    console.log(title, color);

    return (
        <>
            <Alert
                variant="warning"
                onClose={() => alert("The alert was closed")}
                dismissible
            >
                <Alert.Heading>Note on React Version</Alert.Heading>
                <p>
                    The current version of React is v19. This app is built using
                    React v19. The way an app was built using React v16.7 or
                    earlier was significantly different.
                </p>
            </Alert>

            <Menu />

            <Container className="my-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<Navigate to="/" />} />
                    <Route path="/workshops" element={<WorkshopsListPage />} />
                    <Route
                        path="/workshops/add"
                        element={<AddWorkshopPage />}
                    />
                    <Route
                        path="/workshops/favorites"
                        element={<FavoritesPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Container>

            {/*
        <button style={{
          backgroundColor: color
        }}>{title}</button>
        */}
        </>
    );
}

// App.defaultProps = {
//   color: 'gray'
// };
