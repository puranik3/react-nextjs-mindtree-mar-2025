import { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";

import Item from './Item/Item';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../../common/ErrorAlert/ErrorAlert';
import Pagination from '../../common/Pagination/Pagination';
import { getWorkshops } from "../../../services/workshops";
import IWorkshop from '../../../models/IWorkshop';

const WorkshopsList = () => {


    const [filterKey, setFilterKey] = useState('');
    const [filteredWorkshops, setFilteredWorkshops] = useState<IWorkshop[]>([]);

    // const [ page, setPage ] = useState<number>(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = +(searchParams.get("page") || "1"); // Default to page 1
    const category = searchParams.get("category") || "";

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<Error | null>(null);
    const [ workshops, setWorkshops ] = useState<IWorkshop[]>([]);
    
    useEffect(
        // effect function - f (executes AFTER the render)
        // async function ALWAYS returns a promise
        // since effect function should return cleanup function / nothing, async function cannot be used as the effect function
        () => {
            // workaround to using async..await - create an inner function (helper) that is async, and call it
            const helper = async () => {
                setLoading( true );

                try {
                    const data = await getWorkshops(page, category);
                    console.log( data );
                    setWorkshops( data ); // when you update state, React will re-render the component
                } catch(error) {
                    setError(error as Error);
                } finally {
                    setLoading( false );
                }
            };

            helper();

            // effect function can return
            // 1. cleanup function
            // 2. return nothing
            // return () => {

            // }
        },
        [page, category] // dependency array - f executes only when the component loads (it appears on the browser for the first time)
    );

    // for server-side filtering, we would add filterKey to the previous effect - but we are doing client-side filtering
    // side-effect for filtering when filterKey or workshops states change
    useEffect(
        () => {
            setFilteredWorkshops(
                workshops.filter(
                    (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
                )
            );
        },
        [workshops, filterKey]
    );

    // const filteredWorkshops = useMemo(() => {
    //     return workshops.filter(
    //         (workshop) => workshop.name.toUpperCase().includes(filterKey.toUpperCase())
    //     )
    // }, [filterKey]);

    const previous = (newPage: number) => {
        if (page <= 1) {
            return;
        }

        updateQueryParams({ page: '' + newPage });
    };

    const next = (newPage: number) => {
        updateQueryParams({ page: '' + newPage });
    };

    // Function to update multiple query parameters
    const updateQueryParams = (newParams: Record<string, string>) => {
        setSearchParams(
            (prev) => {
                const updatedParams = new URLSearchParams(prev);

                Object.keys(newParams).forEach((key) => {
                    if (newParams[key] === null) {
                        updatedParams.delete(key); // Remove param if value is null
                    } else {
                        updatedParams.set(key, newParams[key]);
                    }
                });

                return updatedParams;
            }
        );
    };


    return (
        <>
            <h1>List of Workshops</h1>
            <hr />

            <div>
                <Pagination
                    page={page}
                    disablePrevious={!(loading === false && error === null)}
                    disableNext={!(loading === false && error === null)}
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
                    <button type="button" className="btn btn-primary" onClick={() => updateQueryParams({ category: '' })}>All</button>
                    <button type="button" className="btn btn-danger" onClick={() => updateQueryParams({ category: 'frontend' })}>Frontend</button>
                    <button type="button" className="btn btn-warning" onClick={() => updateQueryParams({ category: 'backend' })}>Backend</button>
                    <button type="button" className="btn btn-success" onClick={() => updateQueryParams({ category: 'devops' })}>Devops</button>
                    <button type="button" className="btn btn-info" onClick={() => updateQueryParams({ category: 'language' })}>Language</button>
                    <button type="button" className="btn btn-light" onClick={() => updateQueryParams({ category: 'mobile' })}>Mobile</button>
                    <button type="button" className="btn btn-dark" onClick={() => updateQueryParams({ category: 'database' })}>Database</button>
                </div>
            </div>

            {
                loading ? (
                    <LoadingSpinner />
                ) : null
            }

            {
                !loading && error && (
                    <ErrorAlert error={error} />
                )
            }

            {
                !loading && !error && (
                    <Row xs={1} md={2} lg={3} xl={4}>
                        {
                            filteredWorkshops.map(
                                workshop => (
                                    <Col className="my-3 d-flex" key={workshop.id}>
                                        <Item {...workshop} />
                                    </Col>
                                )
                            )
                        }
                    </Row>
                )
            }
        </>
    );
}

export default WorkshopsList;