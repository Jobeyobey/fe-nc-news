import { useContext, useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { getAllTopics, postArticle, postTopic } from "../api";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { checkIsImgURL } from "../utils";
import "../styles/PostArticlePage.css";

function PostArticlePage() {
    const [topics, setTopics] = useState([]);
    const [titleInput, setTitleInput] = useState("");
    const [selectTopicInput, setSelectTopicInput] = useState("select-a-topic");
    const [newTopicInput, setNewTopicInput] = useState({
        slug: "",
        description: "",
    });
    const [bodyInput, setBodyInput] = useState("");
    const [imgURLInput, setImgURLInput] = useState("");
    const [error, setError] = useState({});

    const navigate = useNavigate();
    const user = useContext(UserContext).user;

    useEffect(() => {
        getAllTopics().then((response) => {
            setTopics(response);
        });
    }, []);

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

    function handleTitleChange(e) {
        setTitleInput(e.target.value);
    }

    function handleSelectTopicChange(e) {
        if (
            selectTopicInput === "add-new-topic" &&
            e.target.value !== "add-new-topic"
        ) {
            setNewTopicInput({ slug: "", description: "" });
        }
        setSelectTopicInput(e.target.value);
    }

    function handleNewTopicSlugChange(e) {
        setNewTopicInput((currInput) => {
            return { ...currInput, slug: e.target.value };
        });
    }

    function handleNewTopicDescriptionChange(e) {
        setNewTopicInput((currInput) => {
            return { ...currInput, description: e.target.value };
        });
    }

    function handleBodyChange(e) {
        setBodyInput(e.target.value);
    }

    function handleURLInputChange(e) {
        setImgURLInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError({});

        // Ensure title has an input
        const isTitle = titleInput !== "";
        if (!isTitle)
            setError((currError) => {
                return {
                    ...currError,
                    titleError: "Please provide an article title.",
                };
            });

        // Ensure topic has an input
        const isSelectTopic = selectTopicInput !== "select-a-topic";
        if (!isSelectTopic) {
            setError((currError) => {
                return {
                    ...currError,
                    selectTopicError: "Please select an article topic.",
                };
            });
        }

        // Ensure body has an input
        const isBody = bodyInput !== "";
        if (!isBody) {
            setError((currError) => {
                return {
                    ...currError,
                    bodyError: "Please provide an article body.",
                };
            });
        }

        // Ensure URL has an input
        let isImg = imgURLInput !== "";
        if (!isImg) {
            setError((currError) => {
                return {
                    ...currError,
                    imgError: "Please provide an article image.",
                };
            });
        }

        // If creating a new topic, ensure slug and description have input
        let isNewTopic = true;
        if (selectTopicInput === "add-new-topic") {
            if (newTopicInput.slug !== "" && newTopicInput.description !== "") {
                isNewTopic = true;
            } else {
                isNewTopic = false;
            }
        }
        if (!isNewTopic) {
            setError((currError) => {
                return {
                    ...currError,
                    newTopicError:
                        "Please provide a relevant topic name and description.",
                };
            });
        }

        if (isTitle && isSelectTopic && isNewTopic && isBody && isImg) {
            checkIsImgURL(imgURLInput).then((isValidURL) => {
                if (isValidURL) {
                    const author = user;
                    const articleInfo = {
                        title: titleInput,
                        author,
                        body: bodyInput,
                        article_img_url: imgURLInput,
                    };

                    // Check whether a new topic needs to be created before posting
                    if (selectTopicInput === "add-new-topic") {
                        postTopic(
                            newTopicInput.slug,
                            newTopicInput.description
                        ).then(() => {
                            articleInfo.topic = newTopicInput.slug;
                            postArticle(articleInfo).then(() => {
                                navigate("/");
                            });
                        });
                    } else {
                        articleInfo.topic = selectTopicInput;
                        postArticle(articleInfo).then(() => {
                            navigate("/");
                        });
                    }
                } else {
                    setError((currError) => {
                        return {
                            ...currError,
                            imgError: "Provided image URL is not valid",
                        };
                    });
                }
            });
        }
    }

    return (
        <>
            <AppBar />
            <section className="page-container">
                <h1 className="post-article-header">Post an article</h1>
                <form
                    id="article-form"
                    className="article-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        id="title-input"
                        name="title-input"
                        placeholder="Post Title"
                        value={titleInput}
                        onChange={handleTitleChange}
                        autoComplete="off"
                        className={`input ${error.titleError && "form-error"}`}
                    ></input>
                    {error.titleError && (
                        <p className="error-text">{error.titleError}</p>
                    )}
                    <select
                        name="topics"
                        id="topics"
                        className={`input ${
                            error.selectTopicError && "form-error"
                        }`}
                        onChange={handleSelectTopicChange}
                        value={selectTopicInput}
                    >
                        <option value="select-a-topic">Select a topic</option>
                        <option value="add-new-topic">Add new topic</option>
                        {topicOptions}
                    </select>
                    {error.selectTopicError && (
                        <p className="error-text">{error.selectTopicError}</p>
                    )}
                    {selectTopicInput === "add-new-topic" && (
                        <>
                            <input
                                id="new-topic-slug-input"
                                name="new-topic-slug-input"
                                placeholder="Topic name..."
                                value={newTopicInput.slug}
                                onChange={handleNewTopicSlugChange}
                                autoComplete="off"
                                className={`input ${
                                    error.newTopicError && "form-error"
                                }`}
                            />
                            <input
                                id="new-topic-description-input"
                                name="new-topic-description-input"
                                placeholder="Topic description..."
                                value={newTopicInput.description}
                                onChange={handleNewTopicDescriptionChange}
                                autoComplete="off"
                                className={`input ${
                                    error.newTopicError && "form-error"
                                }`}
                            />
                            {error.newTopicError && (
                                <p className="error-text">
                                    {error.newTopicError}
                                </p>
                            )}
                        </>
                    )}
                    <textarea
                        id="body-input"
                        name="body-input"
                        placeholder="Post body here..."
                        onChange={handleBodyChange}
                        value={bodyInput}
                        className={`input ${error.bodyError && "form-error"}`}
                    />
                    {error.bodyError && (
                        <p className="error-text">{error.bodyError}</p>
                    )}
                    <input
                        id="img-url-input"
                        name="img-url-input"
                        placeholder="Image URL..."
                        value={imgURLInput}
                        onChange={handleURLInputChange}
                        autoComplete="off"
                        className={`input ${error.imgError && "form-error"}`}
                    ></input>
                    {error.imgError && (
                        <p className="error-text">{error.imgError}</p>
                    )}
                    <button type="submit" className="submit-btn">
                        Post Article
                    </button>
                </form>
            </section>
        </>
    );
}

export default PostArticlePage;
