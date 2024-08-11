import { useContext, useState } from "react";
import { deleteCommentById } from "../api";
import { dateToString } from "../utils";
import { UserContext } from "../UserContext";

function Comment({ commentId, author, createdAt, body, setComments }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState({});

    const dateString = dateToString(createdAt);

    function handleDelete(e) {
        e.preventDefault();
        const clickedButtonId = e.target.id;
        setError({});
        setIsDeleting(true);
        deleteCommentById(clickedButtonId)
            .then(() => {
                setComments((currComments) => {
                    const deleteIndex = currComments.findIndex(
                        (comment) =>
                            comment.comment_id === parseInt(clickedButtonId)
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
                <p>{author}</p>
                <p>{dateString}</p>
                {author !== useContext(UserContext).user ? null : isDeleting ? (
                    <button disabled>Deleting...</button>
                ) : (
                    author !== "[Deleted]" && (
                        <button id={commentId} onClick={handleDelete}>
                            Delete
                        </button>
                    )
                )}
            </div>
            <p>{body}</p>
        </div>
    );
}

export default Comment;
