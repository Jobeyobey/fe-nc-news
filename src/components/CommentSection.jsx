import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../api";
import Comment from "../components/Comment.jsx";
import PaginationButtons from "./PaginationButtons.jsx";

function CommentSection({ articleId, commentCount }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(1);

    function handleClick() {
        setIsEnabled(true);
        setIsLoading(true);
        getCommentsByArticleId(articleId, commentsPage).then((response) => {
            setComments(response);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if (isEnabled) {
            setIsLoading(true);
            getCommentsByArticleId(articleId, commentsPage).then((response) => {
                setComments(response);
                setIsLoading(false);
            });
        }
    }, [commentsPage]);

    const commentElements = comments.map((comment) => {
        return (
            <Comment
                key={comment.comment_id}
                author={comment.author}
                createdAt={comment.created_at}
                body={comment.body}
            />
        );
    });

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : isEnabled ? (
                <section className="comment-section">
                    <h2>Comments</h2>
                    {commentElements}
                    <PaginationButtons
                        totalCount={commentCount}
                        currPage={commentsPage}
                        setCurrPage={setCommentsPage}
                    />
                </section>
            ) : (
                <button className="view-comments-btn" onClick={handleClick}>
                    View Comments
                </button>
            )}
        </>
    );
}

export default CommentSection;
