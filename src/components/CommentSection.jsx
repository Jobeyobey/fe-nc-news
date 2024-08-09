import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../api";
import Comment from "../components/Comment.jsx";
import PaginationButtons from "./PaginationButtons.jsx";

function CommentSection({ articleId, commentCount }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(1);

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
                author={comment.author}
                createdAt={comment.created_at}
                body={comment.body}
            />
        );
    });

    return (
        <section className="comment-section">
            {commentCount === 0 ? (
                <h2>No Comments</h2>
            ) : isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <h2 className="comment-section-title">Comments</h2>
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
