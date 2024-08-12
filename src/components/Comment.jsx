import { useContext, useState } from "react";
import { deleteCommentById, voteCommentById } from "../api";
import { dateToString } from "../utils";
import { UserContext } from "../UserContext";
import Votes from "./Votes";

function Comment({ commentId, author, createdAt, body, votes, setComments }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState({});

    const dateString = dateToString(createdAt);
    const user = useContext(UserContext).user;

    function handleDelete(e) {
        e.preventDefault();
        const commentId = e.target.id;
        setError({});
        setIsDeleting(true);
        deleteCommentById(commentId)
            .then(() => {
                setComments((currComments) => {
                    const deleteIndex = currComments.findIndex(
                        (comment) => comment.comment_id === parseInt(commentId)
                    );
                    currComments[deleteIndex] = {
                        ...currComments[deleteIndex],
                        body: "Comment deleted.",
                        author: "[Deleted]",
                    };
                    return [...currComments];
                });
                setIsDeleting(false);
            })
            .catch(() => {
                setIsDeleting(false);
                setError({
                    msg: "Unable to delete comment. Check your internet connection.",
                });
            });
    }

    return (
        <div className="comment-container">
            {Object.keys(error).length > 0 && (
                <p className="error-text">{error.msg}</p>
            )}
            <div className="comment-top">
                <p className="comment-author">{author}</p>
                <p className="comment-date">{dateString}</p>
            </div>
            <p>{body}</p>
            {author !== user ? (
                <Votes
                    votes={votes}
                    uniqueId={commentId}
                    voteFunc={voteCommentById}
                />
            ) : isDeleting ? (
                <button className="delete-btn" disabled>
                    Deleting...
                </button>
            ) : (
                author !== "[Deleted]" && (
                    <button
                        id={commentId}
                        onClick={handleDelete}
                        className="delete-btn"
                    >
                        Delete
                    </button>
                )
            )}
        </div>
    );
}

export default Comment;
