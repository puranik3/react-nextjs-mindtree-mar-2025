import { Button } from "react-bootstrap";

interface Props {
    page?: number,
    onPrevious?: (newPage: number) => void,
    onNext?: (newPage: number) => void,
    disablePrevious?: boolean,
    disableNext?: boolean,
}

const Pagination = (
    {
        page = 1,
        onPrevious = () => {},
        onNext = () => {},
        disablePrevious = false,
        disableNext = false
    } : Props
) => {
    return (
        <>
            <Button
                variant="primary"
                size="sm"
                disabled={disablePrevious || page === 1}
                onClick={() => onPrevious(page - 1)}
                className="me-2"
            >
                Previous
            </Button>
            <Button
                variant="primary"
                size="sm"
                disabled={disableNext}
                onClick={() => onNext(page + 1)}
            >
                Next
            </Button>
            <div>You are viewing page {page}</div>
        </>
    );
}

export default Pagination;