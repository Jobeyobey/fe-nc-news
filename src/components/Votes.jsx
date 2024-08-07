import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowUp,
    faCircleArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { voteArticleById } from "../api";

function Votes({ votes, articleId }) {
    const [voteStatus, setVoteStatus] = useState(null);
    const [voteTracker, setVoteTracker] = useState(votes);

    function handleVote(e) {
        setVoteStatus(() => {
            if (e.target.id === "vote-up") {
                if (voteStatus !== "vote-up") {
                    // If not already voted down
                    setVoteTracker((currVotes) => (currVotes += 1));
                    voteArticleById(articleId, 1).catch(() => {
                        setVoteTracker((currVotes) => (currVotes += -1));
                        setVoteStatus(voteStatus);
                    });
                    return "vote-up";
                } else {
                    setVoteTracker((currVotes) => (currVotes += -1));
                    voteArticleById(articleId, -1).catch(() => {
                        setVoteTracker((currVotes) => (currVotes += 1));
                        setVoteStatus(voteStatus);
                    });
                    return null;
                }
            } else if (e.target.id === "vote-down") {
                if (voteStatus !== "vote-down") {
                    // If not already voted down
                    setVoteTracker((currVotes) => (currVotes += -1));
                    voteArticleById(articleId, -1).catch(() => {
                        setVoteTracker((currVotes) => (currVotes += 1));
                        setVoteStatus(voteStatus);
                    });
                    return "vote-down";
                } else {
                    setVoteTracker((currVotes) => (currVotes += 1));
                    voteArticleById(articleId, +1).catch(() => {
                        setVoteTracker((currVotes) => (currVotes += -1));
                        setVoteStatus(voteStatus);
                    });
                    return null;
                }
            }
        });
    }

    return (
        <div className="votes-container">
            <div id="vote-up" onClick={handleVote}>
                <FontAwesomeIcon
                    className={
                        voteStatus === "vote-up"
                            ? "vote-btn vote-up"
                            : "vote-btn vote-disabled"
                    }
                    icon={faCircleArrowUp}
                />
            </div>
            <p className="vote-text">{voteTracker}</p>
            <div id="vote-down" onClick={handleVote}>
                <FontAwesomeIcon
                    className={
                        voteStatus === "vote-down"
                            ? "vote-btn vote-down"
                            : "vote-btn vote-disabled"
                    }
                    icon={faCircleArrowDown}
                />
            </div>
        </div>
    );
}

export default Votes;
