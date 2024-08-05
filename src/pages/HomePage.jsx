import { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { getArticles } from "../api";
import Article from "../components/Article";

function HomePage() {
    const [articles, setArticles] = useState({});
    const [articlesPage, setArticlesPage] = useState(1);
    console.log(articles);

    useEffect(() => {
        getArticles().then((response) => {
            setArticles(response);
        });
    }, []);

    let articleElements = [];
    if (Object.keys(articles).length) {
        articleElements = articles.articles.map((article) => {
            return (
                <Article
                    key={article.article_id}
                    topic={article.topic}
                    title={article.title}
                    author={article.author}
                    createdAt={article.created_at}
                    votes={article.votes}
                    commentCount={article.comment_count}
                />
            );
        });
    }

    return <section className="page-container">{articleElements}</section>;
}

export default HomePage;
