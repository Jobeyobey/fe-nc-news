import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../api";
import "../styles/ArticlePage.css";
import { dateToString } from "../utils";
import CommentSection from "../components/CommentSection";
import Votes from "../components/Votes";

function ArticlePage() {
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const date = dateToString(article.created_at);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(params["article-id"]).then((response) => {
            setArticle(response);
            setIsLoading(false);
        });
    }, []);

    return (
        <section className="page-container">
            {isLoading ? (
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
                    <p className="article-page-author">by {article.author}</p>
                    <Votes
                        votes={article.votes}
                        articleId={article.article_id}
                    />
                    <p>{article.body}</p>
                    <CommentSection
                        articleId={article.article_id}
                        commentCount={article.comment_count}
                    />
                </>
            )}
        </section>
    );
}

export default ArticlePage;
