// sfc
import { useEffect, useMemo, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store";

import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../../common/ErrorAlert/ErrorAlert';
import Item from './Item/Item';
import Pagination from '../../common/Pagination/Pagination';

// import { fetchWorkshopsPending, fetchWorkshopsSuccess, fetchWorkshopsFailure, workshopsListSelector } from "../../../features/workshopsListSlice";
import { getWorkshopsThunk, workshopsListSelector } from "../../../features/workshopsListSlice";

import { getWorkshops } from '../../../services/workshops';
import IWorkshop from '../../../models/IWorkshop';


interface Props {
    page?: number,
    previous: (by: number) => void,
    next: (by: number) => void,
    category: string,
    setCategory: (category: string) => void
}

const WorkshopsList = (
    {
        page = 1,
        previous,
        next,
        category,
        setCategory
    } : Props
) => {
    // const [loading, setLoading] = useState(true);
    // const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
    // const [error, setError] = useState<Error | null>(null);

    // const [page, setPage] = useState(1);

    const [filterKey, setFilterKey] = useState('');
    // const [filteredWorkshops, setFilteredWorkshops] = useState<IWorkshop[]>([]);

    const dispatch = useAppDispatch();
    const { workshops, loading, error } = useAppSelector(workshopsListSelector);

    // useEffect(
    //     () => {
    //         // setLoading(true);
    //         dispatch(fetchWorkshopsPending());

    //         const helper = async () => {
    //             try {
    //                 const workshops = await getWorkshops(page, category);

    //                 console.log(workshops);

    //                 // setWorkshops(workshops);
    //                 dispatch(fetchWorkshopsSuccess(workshops));
    //             } catch (error) {
    //                 // setError(error as Error);
    //                 dispatch(fetchWorkshopsFailure(error as Error))
    //             }
    //             // finally {
    //             //     // setLoading(false);
    //             // }
    //         };

    //         helper();
    //     },
    //     [  page, category ]
    // );

    useEffect(
        () => {
            dispatch(getWorkshopsThunk({
                page, category
            }));
        },
        [page, category]
    )

    // side-effect for filtering when filterKey or workshops states change
    // useEffect(
    //     () => {
    //         setFilteredWorkshops(
    //             workshops.filter(
    //                 (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
    //             )
    //         );
    //     },
    //     [workshops, filterKey]
    // );

    // for asynchronous operations (like fetching data) we use useEffect()
    // for synchronous logic, i.e logic to execute when the rendering is in progress, we use useMemo() as a performance optimization
    // the result will be calculated immediately but only when the dependencies change (else the current value, eg. current value of filteredWorkshops, will be reused).

    // NOT good - runs on every render, even when workshops / filterKey have not changed
    // const filteredWorkshops = workshops.filter(
    //     (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
    // );

    // BETTER - runs only when workshops / filterKey has changed
    const filteredWorkshops = useMemo(
        // filtering logic
        () => workshops.filter(
            (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
        ),

        // Now filtering logic runs only when workshops, filterKey changes in the component
        // It does not run when any other state changes
        [ workshops, filterKey ]
    );

    return (
        <div className="container my-4">
            <h1>List of workshops</h1>
            <hr />

            <div className="my-4">
                <Pagination
                    page={page}
                    disablePrevious={loading}
                    disableNext={loading}
                    onPrevious={previous}
                    onNext={next}
                />
            </div>

            <div>
                <input
                    type="search"
                    className="form-control"
                    placeholder="Type to search by name"
                    value={filterKey}
                    onChange={(event) => setFilterKey(event.target.value)}
                />
                <div>
                    Workshops whose name has
                    <span className="text-primary"> {filterKey} </span> are shown.
                </div>
            </div>

            <div>
                <div className="btn-group my-3" role="group" aria-label="Filter by category">
                    <button type="button" className="btn btn-primary" onClick={() => setCategory('')}>All</button>
                    <button type="button" className="btn btn-danger" onClick={() => setCategory('frontend')}>Frontend</button>
                    <button type="button" className="btn btn-warning" onClick={() => setCategory('backend')}>Backend</button>
                    <button type="button" className="btn btn-success" onClick={() => setCategory('devops')}>Devops</button>
                    <button type="button" className="btn btn-info" onClick={() => setCategory('language')}>Language</button>
                    <button type="button" className="btn btn-light" onClick={() => setCategory('mobile')}>Mobile</button>
                    <button type="button" className="btn btn-dark" onClick={() => setCategory('database')}>Database</button>
                </div>
            </div>

            {loading === true && (
                <LoadingSpinner />
            )}

            {error !== null && loading === false && (
                <ErrorAlert error={error as Error} />
            )}

            {/* if we pass workshop as prop */}
            {/* <Item workshop={w} /> */}

            {/* We can use the props spread instead of this to pass individual properties */}
            {/*<Item
                name={w.name}
                imageUrl={w.imageUrl}
                location={w.location}
                id={w.id}
                ......
            />*/}
            {
                error === null && loading === false && (
                    <Row xs={1} md={3} lg={4}>
                        {
                            filteredWorkshops.map((w) => (
                                <Col
                                    className="my-3 d-flex"
                                    key={w.id}
                                >
                                    <Item {...w} />
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </div>
    );
};

export default WorkshopsList;