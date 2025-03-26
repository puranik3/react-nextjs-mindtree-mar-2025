import { FormEvent, useRef } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { postSession } from '../../../../services/sessions';
import { Level } from '../../../../models/ISession';

interface Props {
    id: number;
}

const AddSession = ({ id }: Props) => {
    console.log('render');

    const navigate = useNavigate();

    // { register: fn(), formState: {  errors: {} } }
    const { register, formState: { errors }, getValues } = useForm({
        mode: 'all'
    });

    const validateDurationAndLevel = () => {
        const duration = +getValues('duration');
        const level = getValues('level');

        if( level === 'Basic' && duration < 1 ) {
            return 'Basic level shold have minimum 1 hour duration';
        }

        if( level === 'Interemdiate' && duration < 2 ) {
            return 'Intermediate level shold have minimum 2 hours duration';
        }

        if( level === 'Advanced' && duration < 3 ) {
            return 'Advanced level shold have minimum 3 hours duration';
        }

        // return true;
    };

    const addSession = async (event : FormEvent) => {
    //     event.preventDefault();

    //     const session = {
    //         workshopId: id,
    //         upvoteCount: 0,
    //         // sequenceId: sequenceId,
    //         sequenceId: +sequenceIdRef.current.value,
    //         name: nameRef.current.value,
    //         speaker: speakerRef.current.value,
    //         duration: +durationRef.current.value,
    //         level: levelRef.current.value as Level,
    //         abstract: abstractRef.current.value
    //     };

    //     console.log( session );

    //     // You can do validation here
    //     // left as an exercise

    //     try {
    //         const newSession = await postSession(session);
    //         toast("New session was added");
    //         navigate("/workshops/" + id);
    //     } catch(error) {
    //         toast((error as Error).message);
    //     }
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
                        type="text"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                        {...register('sequenceId', { required: true, pattern: /^\d+$/ })}
                    />
                    {
                        errors.sequenceId && (
                            <div className="text-danger">
                                {
                                    errors.sequenceId?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.sequenceId?.type === 'pattern' && (
                                        <div>Sequence ID must be a positive integer</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                        {...register('name', { required: true, pattern: /^[A-Za-z][A-Za-z ]*$/ })}
                    />
                    {
                        errors.name && (
                            <div className="text-danger">
                                {
                                    errors.name?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.name?.type === 'pattern' && (
                                        <div>Name can only have letters A-Za-z and spaces in between</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                        {...register('duration', { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        aria-label="Level"
                        {...register('level', { required: true, validate: validateDurationAndLevel })}
                    >
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                    {
                        errors.level && (
                            <div className="text-danger">
                                {
                                    errors.level?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.level?.type === 'validate' && (
                                        <div>The duration in insufficient for the selected level</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
};

export default AddSession;
