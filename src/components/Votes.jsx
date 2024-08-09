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
    const [isError, setIsError] = useState(false);

    function handleVote(e) {
        setIsError(() => false);

        if (e.target.id === "vote-up" && voteStatus !== "vote-up") {
            setVoteStatus(() => "vote-up");
            setVoteTracker(() => votes + 1);
            voteArticleById(articleId, 1).catch(() => {
                setIsError(() => true);
                setVoteStatus(() => null);
                setVoteTracker(() => votes);
            });
        } else if (e.target.id === "vote-down" && voteStatus !== "vote-down") {
            setVoteStatus(() => "vote-down");
            setVoteTracker(() => votes - 1);
            voteArticleById(articleId, -1).catch(() => {
                setIsError(() => true);
                setVoteStatus(() => null);
                setVoteTracker(() => votes);
            });
        } else {
            const voteInc = voteStatus === "vote-up" ? -1 : 1;
            const currVoteStatus = voteStatus;
            const currVotes = voteTracker;
            setVoteStatus(null);
            setVoteTracker(() => votes);
            voteArticleById(articleId, voteInc).catch(() => {
                setIsError(() => true);
                setVoteTracker(() => currVotes);
                setVoteStatus(() => currVoteStatus);
            });
        }
    }

    return (
        <>
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
            {isError && (
                <p className="error-text">
                    Unable to vote - Check your internet connection
                </p>
            )}
        </>
    );
}

export default Votes;
