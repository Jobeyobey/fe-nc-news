import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowUp,
    faCircleArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

function Votes({ votes, uniqueId, voteFunc }) {
    const [voteStatus, setVoteStatus] = useState(null);
    const [voteTracker, setVoteTracker] = useState(votes);
    const [error, setError] = useState({});

    const user = useContext(UserContext).user;

    function handleVote(e) {
        setError({});

        if (user) {
            if (e.target.id === "vote-up" && voteStatus !== "vote-up") {
                setVoteStatus("vote-up");
                setVoteTracker(votes + 1);
                voteFunc(uniqueId, 1).catch(() => {
                    setError({
                        msg: "Unable to vote - Check your internet connection",
                    });
                    setVoteStatus(null);
                    setVoteTracker(votes);
                });
            } else if (
                e.target.id === "vote-down" &&
                voteStatus !== "vote-down"
            ) {
                setVoteStatus("vote-down");
                setVoteTracker(votes - 1);
                voteFunc(uniqueId, -1).catch(() => {
                    setError({
                        msg: "Unable to vote - Check your internet connection",
                    });
                    setVoteStatus(null);
                    setVoteTracker(votes);
                });
            } else {
                const voteInc = voteStatus === "vote-up" ? -1 : 1;
                const currVoteStatus = voteStatus;
                const currVotes = voteTracker;
                setVoteStatus(null);
                setVoteTracker(votes);
                voteFunc(uniqueId, voteInc).catch(() => {
                    setError({
                        msg: "Unable to vote. Check your internet connection",
                    });
                    setVoteTracker(currVotes);
                    setVoteStatus(currVoteStatus);
                });
            }
        } else {
            setError({
                msg: "Log in to vote",
            });
        }
    }

    return (
        <>
            <div className="votes-container">
                <button
                    id="vote-up"
                    onClick={handleVote}
                    className="vote-btn-element"
                >
                    <FontAwesomeIcon
                        className={
                            voteStatus === "vote-up"
                                ? "vote-btn vote-up"
                                : "vote-btn vote-disabled"
                        }
                        icon={faCircleArrowUp}
                    />
                </button>
                <p className="vote-text">{voteTracker}</p>
                <button
                    id="vote-down"
                    onClick={handleVote}
                    className="vote-btn-element"
                >
                    <FontAwesomeIcon
                        className={
                            voteStatus === "vote-down"
                                ? "vote-btn vote-down"
                                : "vote-btn vote-disabled"
                        }
                        icon={faCircleArrowDown}
                    />
                </button>
            </div>
            {Object.keys(error).length > 0 && (
                <p className="vote-error">{error.msg}</p>
            )}
        </>
    );
}

export default Votes;
