import { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import Item from './Item/Item';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../../common/ErrorAlert/ErrorAlert';
import Pagination from '../../common/Pagination/Pagination';
import { getWorkshops } from "../../../services/workshops";
import IWorkshop from '../../../models/IWorkshop';

const WorkshopsList = () => {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<Error | null>(null);
    const [ workshops, setWorkshops ] = useState<IWorkshop[]>([]);
    const [ page, setPage ] = useState<number>(1);

    useEffect(
        // effect function - f (executes AFTER the render)
        // async function ALWAYS returns a promise
        // since effect function should return cleanup function / nothing, async function cannot be used as the effect function
        () => {
            // workaround to using async..await - create an inner function (helper) that is async, and call it
            const helper = async () => {
                setLoading( true );

                try {
                    const data = await getWorkshops(page);
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
        [page] // dependency array - f executes only when the component loads (it appears on the browser for the first time)
    );

    const previous = (newPage: number) => {
        if (page <= 1) {
            return;
        }

        // when the new state depends on the current state, we use the function form of the setter
        // setPage(newPage); // can lead to bugs
        setPage( p => p - 1 );
    };

    const next = (newPage: number) => {
        setPage( p => p + 1);
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
                            workshops.map(
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