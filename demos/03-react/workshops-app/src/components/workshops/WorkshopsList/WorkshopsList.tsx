import { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

import { getWorkshops } from "../../../services/workshop";
import IWorkshop from '../../../models/IWorkshop';

const WorkshopsList = () => {
    console.log('render');

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
                    const data = await getWorkshops();
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
        [] // dependency array - f executes only when the component loads (it appears on the browser for the first time)
    );

    return (
        <>
            <h1>List of Workshops</h1>
            <hr />

            {
                loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : null
            }

            {
                !loading && error && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }

            {
                !loading && !error && (
                    <div>Number of workshops = {workshops.length}</div>
                )
            }
        </>
    );
}

export default WorkshopsList;