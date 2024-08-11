import { useContext, useEffect, useState } from "react";
import "../styles/HomePage.css";
import { getAllTopics, getAllUsers, getArticles } from "../api";
import Article from "../components/Article";
import PaginationButtons from "../components/PaginationButtons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { prepareSearchParams } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpShortWide,
    faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import AppBar from "../components/AppBar";
import Lottie from "lottie-react";
import loadingAnimation from "../../images/Loading.json";
import { UserContext } from "../UserContext";

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState({});
    const [articlesPage, setArticlesPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const [isOrderedDesc, setIsOrderedDesc] = useState(true);

    const navigate = useNavigate();
    const user = useContext(UserContext).user;

    useEffect(() => {
        setIsLoading(true);
        getAllTopics().then((response) => {
            setTopics(response);
        });
        getArticles(
            articlesPage,
            searchParams.get("topic"),
            searchParams.get("sort_by"),
            searchParams.get("order")
        )
            .then((response) => {
                setArticles(response);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.response.data.msg === "topic not found") {
                    navigate("/404?error=topic-not-found");
                } else {
                    navigate("/404");
                }
            });
    }, [articlesPage, searchParams, isOrderedDesc]);

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
        const params = prepareSearchParams(
            e.target.value,
            searchParams.get("sort_by"),
            isOrderedDesc
        );
        setSearchParams(params);
    }

    function handleSortChange(e) {
        const params = prepareSearchParams(
            searchParams.get("topic"),
            e.target.value,
            isOrderedDesc
        );
        setSearchParams(params);
    }

    function handleOrderChange() {
        const params = prepareSearchParams(
            searchParams.get("topic"),
            searchParams.get("sort_by"),
            !isOrderedDesc
        );
        setSearchParams(params);
        setIsOrderedDesc((currOrder) => !currOrder);
    }

    return (
        <>
            <AppBar />
            <section className="page-container">
                {isLoading ? (
                    <>
                        <h1 className="loading-title">
                            Loading your content...
                        </h1>
                        <Lottie animationData={loadingAnimation} loop={true} />
                    </>
                ) : (
                    <>
                        <h2 className="user-greeting">Hi, {user}!</h2>
                        <div className="search-options">
                            <select
                                name="topics"
                                id="topics"
                                className="query-select"
                                onChange={handleTopicChange}
                                value={
                                    searchParams.get("topic") || "all-topics"
                                }
                            >
                                <option value="all-topics">All Topics</option>
                                {topicOptions}
                            </select>
                            <select
                                name="sort-by"
                                id="sort-by"
                                className="query-select"
                                onChange={handleSortChange}
                                value={searchParams.get("sort_by") || "date"}
                            >
                                <option value="date">Date</option>
                                <option value="title">Title</option>
                                <option value="topic">Topic</option>
                                <option value="author">Author</option>
                                <option value="votes">Popularity</option>
                                <option value="comment_count">Comments</option>
                            </select>
                            {isOrderedDesc ? (
                                <FontAwesomeIcon
                                    className="order-icon"
                                    icon={faArrowDownShortWide}
                                    onClick={handleOrderChange}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className="order-icon"
                                    icon={faArrowUpShortWide}
                                    onClick={handleOrderChange}
                                />
                            )}
                        </div>
                        {articleElements}
                        <PaginationButtons
                            totalCount={articles.article_count}
                            currPage={articlesPage}
                            setCurrPage={setArticlesPage}
                        />
                    </>
                )}
            </section>
        </>
    );
}

export default HomePage;
