import { Alert } from 'react-bootstrap';

interface Props {
    error: Error
}

const ErrorAlert = ( { error } : Props ) => {
    return (
        <Alert variant="danger">
            {error.message}
        </Alert>
    );
}

export default ErrorAlert;