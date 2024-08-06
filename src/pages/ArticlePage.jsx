import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../api";
import "../styles/ArticlePage.css";
import { dateToString } from "../utils";

function ArticlePage() {
    const [article, setArticle] = useState({});

    const params = useParams();

    useEffect(() => {
        getArticleById(params["article-id"]).then((response) => {
            setArticle(response);
        });
    }, []);

    const date = dateToString(article.created_at);

    return (
        <section className="page-container">
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
            <p>{article.body}</p>
        </section>
    );
}

export default ArticlePage;
