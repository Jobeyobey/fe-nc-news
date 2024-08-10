import { useEffect, useState } from "react";
import { getCommentsByArticleId, postCommentToArticle } from "../api";
import Comment from "../components/Comment.jsx";
import PaginationButtons from "./PaginationButtons.jsx";

function CommentSection({ articleId, commentCount }) {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(1);
    const [newCommentBody, setNewCommentBody] = useState("");
    const [isPostingComment, setIsPostingComment] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        setIsLoading(true);
        getCommentsByArticleId(articleId, commentsPage).then((response) => {
            setComments(response);
            setIsLoading(false);
        });
    }, [commentsPage]);

    const commentElements = comments.map((comment) => {
        return (
            <Comment
                key={comment.comment_id}
                commentId={comment.comment_id}
                author={comment.author}
                createdAt={comment.created_at}
                body={comment.body}
                setComments={setComments}
            />
        );
    });

    function handleCommentBodyChange(e) {
        setNewCommentBody(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError({});
        if (newCommentBody === "") {
            setError({ msg: "Please write a comment before submitting" });
        } else {
            setIsPostingComment(true);
            postCommentToArticle(articleId, newCommentBody)
                .then((newComment) => {
                    setComments((currComments) => {
                        return [newComment, ...currComments];
                    });
                    setIsPostingComment(false);
                })
                .catch(() => {
                    setError({
                        msg: "Unable to post comment. Check your internet connection",
                    });
                    setIsPostingComment(false);
                });
            setNewCommentBody("");
        }
    }

    return (
        <section className="comment-section">
            {commentCount === 0 ? (
                <h2>No Comments</h2>
            ) : isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <h2 className="comment-section-title">Comments</h2>
                    <div className="comment-container">
                        <form
                            id="comment-form"
                            className="comment-form"
                            onSubmit={handleSubmit}
                        >
                            <label>Add a comment</label>
                            <textarea
                                name="comment-body"
                                id="comment-body"
                                placeholder="Comment here..."
                                value={newCommentBody}
                                onChange={handleCommentBodyChange}
                            />
                            {isPostingComment ? (
                                <button type="submit" disabled>
                                    Submitting...
                                </button>
                            ) : (
                                <button type="submit">Submit</button>
                            )}
                            {Object.keys(error).length > 0 && (
                                <p className="error-text">{error.msg}</p>
                            )}
                        </form>
                    </div>
                    {commentElements}
                    <PaginationButtons
                        totalCount={commentCount}
                        currPage={commentsPage}
                        setCurrPage={setCommentsPage}
                    />
                </>
            )}
        </section>
    );
}

export default CommentSection;
