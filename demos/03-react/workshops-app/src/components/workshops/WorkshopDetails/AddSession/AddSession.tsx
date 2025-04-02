import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import { postSession } from '../../../../services/sessions';
import { Level } from '../../../../models/ISession';

interface Props {
    id: number;
}

const AddSession = ({ id }: Props) => {
    const navigate = useNavigate();

    const [sequenceId, setSequenceId] = useState('');
    const [name, setName] = useState('');
    const [speaker, setSpeaker] = useState('');
    const [duration, setDuration] = useState('');
    const [level, setLevel] = useState('');
    const [abstract, setAbstract] = useState('');

    const addSession = async ( event : FormEvent ) => {
        event.preventDefault();

        if(
            sequenceId !== '' &&
            name !== '' &&
            speaker !== '' &&
            duration !==  '' &&
            level !== '' &&
            abstract !== ''
        ) {
            try {
                const session = {
                    workshopId: id,
                    upvoteCount: 0,
                    sequenceId: +sequenceId,
                    name,
                    speaker,
                    duration: +duration,
                    level: level as Level,
                    abstract
                }

                const data = await postSession( session );
                navigate( `/workshops/${id}` );
            } catch( error ) {
                alert((error as Error).message);
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
                        value={sequenceId}
                        onChange={event => setSequenceId(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                        value={speaker}
                        onChange={event => setSpeaker(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                        value={duration}
                        onChange={event => setDuration(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select aria-label="Level" value={level} onChange={event => setLevel(event.target.value)}>
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={abstract}
                        onChange={event => setAbstract(event.target.value)}
                    />
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
};

export default AddSession;
