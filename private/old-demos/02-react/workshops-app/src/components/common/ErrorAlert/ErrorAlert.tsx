import { Alert } from "react-bootstrap";

interface IProps {
    error: Error
}

// props -> { error: Error }
const ErrorAlert = ({ error } : IProps) => {
    return (
        <Alert variant="danger">
            {error.message}
        </Alert>
    );
}

export default ErrorAlert;