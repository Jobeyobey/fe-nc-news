import { useState } from "react";
import { deleteCommentById } from "../api";
import { dateToString } from "../utils";

function Comment({ commentId, author, createdAt, body, setComments }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isError, setIsError] = useState(false);
    const dateString = dateToString(createdAt);

    function handleClick(e) {
        e.preventDefault();
        const clickedButtonId = e.target.id;
        setIsError(false);
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
                setIsDeleting(() => false);
            })
            .catch(() => {
                setIsDeleting(false);
                setIsError({
                    msg: "Unable to delete comment. Check your internet connection.",
                });
            });
    }

    return (
        <div className="comment-container">
            {isError && <p className="error-text">{isError.msg}</p>}
            <div className="comment-top">
                <p>{author}</p>
                <p>{dateString}</p>
                {author !==
                localStorage.getItem("username") ? null : isDeleting ? (
                    <button disabled>Deleting...</button>
                ) : (
                    author !== "[Deleted]" && (
                        <button id={commentId} onClick={handleClick}>
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
