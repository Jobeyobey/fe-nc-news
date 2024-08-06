import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";

function ArticlePage() {
    const [article, setArticle] = useState({});

    const params = useParams();

    useEffect(() => {
        getArticleById(params["article-id"]).then((response) => {
            setArticle(response);
        });
    }, []);

    return (
        <section className="page-container">
            <img src={article.article_img_url} />
            <p>{article.topic}</p>
            <h1>{article.title}</h1>
            <h2>{article.author}</h2>
            <p>{article.created_at}</p>
            <p>{article.body}</p>
        </section>
    );
}

export default ArticlePage;
