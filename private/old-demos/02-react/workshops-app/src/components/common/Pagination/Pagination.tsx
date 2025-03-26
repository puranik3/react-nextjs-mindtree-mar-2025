interface Props {
    page: number,
    disablePrevious?: boolean,
    disableNext?: boolean,
    onPrevious?: (by : number) => void,
    onNext?: (by: number) => void
}

// callback props -> functions passed as props
const Pagination = (
    {
        page,
        disablePrevious = false,
        disableNext = false,
        onPrevious = () => {}, // callback prop
        onNext = () => {}, // callback prop
    } : Props
) => {
    return (
        <>
            <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => onPrevious(1)}
                disabled={disablePrevious || page === 1}
            >
                Previous
            </button>
            <button
                className="btn btn-sm btn-primary"
                onClick={() => onNext(1)}
                disabled={disableNext}
            >
                Next
            </button>
            <div>You are viewing page {page}</div>
        </>
    );
}

export default Pagination;