import { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { getArticles } from "../api";
import Article from "../components/Article";
import PaginationButtons from "../components/PaginationButtons";

function HomePage() {
    const [articles, setArticles] = useState({});
    const [articlesPage, setArticlesPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticles(articlesPage).then((response) => {
            setArticles(response);
            setIsLoading(false);
        });
    }, [articlesPage]);

    let articleElements = [];
    if (Object.keys(articles).length) {
        articleElements = articles.articles.map((article) => {
            return (
                <Article
                    key={article.article_id}
                    imgURL={article.article_img_url}
                    articleId={article.article_id}
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

    return (
        <section className="page-container">
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {articleElements}
                    <PaginationButtons
                        totalArticles={articles.article_count}
                        articlesPage={articlesPage}
                        setArticlesPage={setArticlesPage}
                    />
                </>
            )}
        </section>
    );
}

export default HomePage;
