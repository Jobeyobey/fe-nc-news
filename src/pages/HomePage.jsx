import { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { getAllTopics, getAllUsers, getArticles } from "../api";
import Article from "../components/Article";
import PaginationButtons from "../components/PaginationButtons";
import { useSearchParams } from "react-router-dom";

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState({});
    const [articlesPage, setArticlesPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllTopics().then((response) => {
            setTopics(response);
        });
        getArticles(articlesPage, searchParams.get("topic")).then(
            (response) => {
                setArticles(response);
                setIsLoading(false);
            }
        );
    }, [articlesPage, searchParams]);

    let topicOptions = [];
    if (topics.length > 0) {
        topicOptions = topics.map((topic) => {
            return (
                <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                </option>
            );
        });
    }

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

    function handleTopicChange(e) {
        setSearchParams({ topic: e.target.value });
    }

    return (
        <section className="page-container">
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <select
                        name="topics"
                        id="topics"
                        className="topic-select"
                        onChange={handleTopicChange}
                        value={searchParams.get("topic")}
                    >
                        <option value="All Topics">All Topics</option>
                        {topicOptions}
                    </select>
                    {articleElements}
                    <PaginationButtons
                        totalCount={articles.article_count}
                        currPage={articlesPage}
                        setCurrPage={setArticlesPage}
                    />
                </>
            )}
        </section>
    );
}

export default HomePage;
