import { useState, useEffect } from 'react';

import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../../common/ErrorAlert/ErrorAlert';
import { getWorkshops } from "../../../services/workshops";
import IWorkshop from '../../../models/IWorkshop';

const WorkshopsList = () => {
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
                    workshops.map(
                        workshop => <div key={workshop.id}>{workshop.name}</div>
                    )
                )
            }
        </>
    );
}

export default WorkshopsList;