import { useContext, useEffect, useState } from "react";
import { getCommentsByArticleId, postCommentToArticle } from "../api";
import Comment from "../components/Comment.jsx";
import PaginationButtons from "./PaginationButtons.jsx";
import { UserContext } from "../UserContext.js";
import Lottie from "lottie-react";
import loadingAnimation from "../../images/Loading.json";

function CommentSection({ articleId, commentCount }) {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(1);
    const [newCommentBody, setNewCommentBody] = useState("");
    const [isPostingComment, setIsPostingComment] = useState(false);
    const [error, setError] = useState({});

    const user = useContext(UserContext).user;

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
                votes={comment.votes}
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
        } else if (user) {
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
        } else {
            setError({ msg: "You must be logged in to comment." });
        }
    }

    return (
        <section className="comment-section">
            {isLoading ? (
                <>
                    <h1 className="loading-title">Loading your content...</h1>
                    <Lottie animationData={loadingAnimation} loop={true} />
                </>
            ) : (
                <>
                    {comments.length > 0 ? (
                        <h2 className="comment-section-title">Comments</h2>
                    ) : (
                        <h2 className="comment-section-title">
                            Be the first to comment!
                        </h2>
                    )}
                    <div className="comment-container">
                        <form
                            id="comment-form"
                            className="comment-form"
                            onSubmit={handleSubmit}
                        >
                            {user ? (
                                <label className="post-comment-label">
                                    Add to the conversation
                                </label>
                            ) : (
                                <label className="post-comment-label">
                                    Log in to comment
                                </label>
                            )}
                            <textarea
                                name="comment-body"
                                id="comment-body"
                                placeholder="Comment here..."
                                disabled={user ? false : true}
                                value={newCommentBody}
                                onChange={handleCommentBodyChange}
                            />
                            {isPostingComment ? (
                                <button type="submit" disabled>
                                    Submitting...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={user ? false : true}
                                >
                                    Submit
                                </button>
                            )}
                            {Object.keys(error).length > 0 && (
                                <p className="error-text">{error.msg}</p>
                            )}
                        </form>
                    </div>
                </>
            )}
            {comments.length > 0 && (
                <>
                    {commentElements}
                    {Math.ceil(commentCount / 10) > 1 && (
                        <PaginationButtons
                            totalCount={commentCount}
                            currPage={commentsPage}
                            setCurrPage={setCommentsPage}
                        />
                    )}
                </>
            )}
        </section>
    );
}

export default CommentSection;
