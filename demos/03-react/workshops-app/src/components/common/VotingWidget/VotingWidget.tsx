import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
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
                icon={faCaretUp}
                onClick={() => vote('upvote')}
                className="fa-2x voting-widget-button"
            />
            <span className="voting-widget-votes">{ votes }</span>
            <FontAwesomeIcon
                icon={faCaretDown}
                onClick={() => vote('downvote')}
                className="fa-2x voting-widget-button"
            />
        </div>
    );
}

export default VotingWidget;