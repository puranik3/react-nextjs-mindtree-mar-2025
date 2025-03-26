import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp, faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { VoteType } from '../../../models/utils';

import './VotingWidget.scss';

export type VoteFunction = ( voteType: VoteType ) => void;

interface Props {
    votes: number,
    vote: VoteFunction
}

const VotingWidget = ( { votes, vote } : Props ) => {
    return (
        <div className="voting-widget">
            <FontAwesomeIcon
                icon={faCaretSquareUp}
                onClick={() => vote('upvote')}
                className="fa-2x voting-widget-button"
            />
            <span className="voting-widget-votes">{ votes }</span>
            <FontAwesomeIcon
                icon={faCaretSquareDown}
                onClick={() => vote('downvote')}
                className="fa-2x voting-widget-button"
            />
        </div>
    );
}

export default VotingWidget;