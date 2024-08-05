import { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { getArticles } from "../api";
import Article from "../components/Article";

function HomePage() {
    const [articles, setArticles] = useState({});

    useEffect(() => {
        getArticles().then((response) => {
            setArticles(response);
        });
    }, []);

    let articleElements = [];
    if (Object.keys(articles).length) {
        articleElements = articles.articles.map((article) => {
            return <Article key={article.article_id} title={article.title} />;
        });
    }

    return <section className="page-container">{articleElements}</section>;
}

export default HomePage;
