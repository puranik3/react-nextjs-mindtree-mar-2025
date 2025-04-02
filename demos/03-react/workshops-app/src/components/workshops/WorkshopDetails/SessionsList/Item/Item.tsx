import { Row, Col } from 'react-bootstrap';
import ISession from "../../../../../models/ISession";
import VotingWidget, { VoteFunction } from "../../../../common/VotingWidget/VotingWidget";

interface Props {
    session: ISession,
    vote: VoteFunction
}

const Item = ( { session, vote } : Props ) => {
    const { id, name, speaker, level, abstract, duration, upvoteCount } = session;

    return (
        <Row>
            <Col
                xs={1}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <VotingWidget
                    votes={upvoteCount}
                    vote={vote}
                />
            </Col>
            <Col xs={11}>
                <h3>{ name }</h3>
                <div>by { speaker }</div>
                <div>{ level }</div>
                <div>{ duration }</div>
                <div>{ abstract }</div>
            </Col>
        </Row>
    );
}

export default Item;