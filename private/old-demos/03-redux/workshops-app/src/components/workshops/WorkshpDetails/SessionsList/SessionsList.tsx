import { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "../../../common/ErrorAlert/ErrorAlert";
import Item from "./Item/Item";

import { getSessionsForWorkshop, voteForSession } from "../../../../services/sessions";
import ISession from "../../../../models/ISession";
import { VoteType } from "../../../../models/utils";

interface Props {
    id: number
}

const SessionsList = ( { id } : Props ) => {
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const sessions = await getSessionsForWorkshop(id);

                    setLoading(false);
                    setSessions(sessions);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        [id]
    );

    const vote = useCallback(
        async (
            sessionId: number,
            voteType: VoteType
        ) => {
            // alert(sessionId + ' ' + voteType);

            // call the service
            try {
                const updatedSession = await voteForSession(sessionId, voteType);
                setSessions(
                    sessions => sessions.map( s => s.id === sessionId ? updatedSession : s )
                );
                toast('You vote for session ' + updatedSession.name +' has been captured');
            } catch(error) {
                toast((error as Error).message);
            }
        },
        [voteForSession, setSessions, toast]
    );

    return (
        <div>
            <h2>List of Sessions</h2>

            <hr />

            {loading && (
                <LoadingSpinner />
            )}

            {!loading && error && (
                <ErrorAlert error={error} />
            )}

            {!loading && !error && (
                <ListGroup>
                    {sessions.map((s, idx) => (
                        <ListGroup.Item key={s.id}>
                            <Item
                                session={s}
                                vote={(voteType) => vote(s.id, voteType)}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default SessionsList;