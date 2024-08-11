import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteArticleById, getArticleById, voteArticleById } from "../api";
import "../styles/ArticlePage.css";
import { dateToString } from "../utils";
import CommentSection from "../components/CommentSection";
import Votes from "../components/Votes";
import AppBar from "../components/AppBar";
import { UserContext } from "../UserContext";

function ArticlePage() {
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const params = useParams();
    const date = dateToString(article.created_at);
    const user = useContext(UserContext).user;

    useEffect(() => {
        setIsLoading(true);
        getArticleById(params["article-id"])
            .then((response) => {
                setArticle(response);
                setIsLoading(false);
            })
            .catch(() => {
                navigate("/404?error=article-not-found");
            });
    }, []);

    function handleDelete(e) {
        e.preventDefault();
        const articleId = e.target.id;
        setError({});
        setIsDeleting(true);
        deleteArticleById(articleId)
            .then(() => {
                setIsDeleted(true);
            })
            .catch(() => {
                setIsDeleting(false);
                setError({
                    msg: "Unable to delete article. Check your internet connection.",
                });
            });
    }

    return (
        <>
            <AppBar />
            <section className="page-container">
                {isDeleted ? (
                    <>
                        <h1>Your article has been successfully deleted</h1>
                        <Link to="/">Home</Link>
                    </>
                ) : isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <Link to="/">← Home</Link>
                        <img
                            src={article.article_img_url}
                            className="article-page-hero-image"
                        />
                        <div className="article-page-info">
                            <p>{article.topic}</p>
                            <p>{date}</p>
                        </div>
                        <h1 className="article-page-title">{article.title}</h1>
                        <p className="article-page-author">
                            by {article.author}
                        </p>
                        <Votes
                            votes={article.votes}
                            uniqueId={article.article_id}
                            voteFunc={voteArticleById}
                        />

                        {article.author !== user ? null : isDeleting ? (
                            <button disabled>Deleting...</button>
                        ) : (
                            article.author !== "[Deleted]" && (
                                <button
                                    id={article.article_id}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            )
                        )}
                        {Object.keys(error).length > 0 && (
                            <p className="error-text">{error.msg}</p>
                        )}

                        <p>{article.body}</p>
                        <CommentSection
                            articleId={article.article_id}
                            commentCount={article.comment_count}
                        />
                    </>
                )}
            </section>
        </>
    );
}

export default ArticlePage;
