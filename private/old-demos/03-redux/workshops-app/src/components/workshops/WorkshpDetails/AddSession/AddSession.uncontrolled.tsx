import { FormEvent, useRef } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { postSession } from '../../../../services/sessions';
import { Level } from '../../../../models/ISession';

interface Props {
    id: number;
}

const AddSession = ({ id }: Props) => {
    console.log( 'render' );

    const navigate = useNavigate();

    const sequenceIdRef = useRef<HTMLInputElement>(null); // { current: domNodeOfSequenceIdInput }
    const nameRef = useRef<HTMLInputElement>(null);
    const speakerRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);
    const levelRef = useRef<HTMLSelectElement>(null);
    const abstractRef = useRef<HTMLTextAreaElement>(null);

    const addSession = async (event : FormEvent) => {
        event.preventDefault();

        if(
            sequenceIdRef.current !== null &&
            nameRef.current !== null &&
            speakerRef.current !== null &&
            durationRef.current !== null &&
            levelRef.current !== null &&
            abstractRef.current !== null
        ) {
            const session = {
                workshopId: id,
                upvoteCount: 0,
                // sequenceId: sequenceId,
                sequenceId: +sequenceIdRef.current.value,
                name: nameRef.current.value,
                speaker: speakerRef.current.value,
                duration: +durationRef.current.value,
                level: levelRef.current.value as Level,
                abstract: abstractRef.current.value
            };

            console.log( session );

            // You can do validation here
            // left as an exercise

            try {
                const newSession = await postSession(session);
                toast("New session was added");
                navigate("/workshops/" + id);
            } catch(error) {
                toast((error as Error).message);
            }
        }
    };

    return (
        <div>
            <h1 className="d-flex justify-content-between align-items-center">
                Add a Session
                <Link to=".." className="btn btn-primary">
                    List of sessions
                </Link>
            </h1>

            <hr />

            <Form onSubmit={addSession}>
                <Form.Group className="mb-4" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                        ref={sequenceIdRef}
                        defaultValue={1}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                        ref={nameRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                        ref={speakerRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                        ref={durationRef}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select aria-label="Level" ref={levelRef}>
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control as="textarea" rows={3} ref={abstractRef} />
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
};

export default AddSession;
