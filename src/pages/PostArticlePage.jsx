import { useContext, useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { getAllTopics, postArticle, postTopic } from "../api";
import "../styles/PostArticlePage.css";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

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

        // Ensure all fields have input
        const isTitle = titleInput !== "";
        const isSelectTopic = selectTopicInput !== "select-a-topic";
        const isBody = bodyInput !== "";
        const isImg = imgURLInput !== "";

        // If creating a new topic, ensure slug and description are filled
        let isNewTopic = true;
        if (selectTopicInput === "add-new-topic") {
            if (newTopicInput.slug !== "" && newTopicInput.description !== "") {
                isNewTopic = true;
            } else {
                isNewTopic = false;
            }
        }

        const author = user;
        const articleInfo = {
            title: titleInput,
            author,
            body: bodyInput,
            article_img_url: imgURLInput,
        };

        if (isTitle && isSelectTopic && isNewTopic && isBody && isImg) {
            if (selectTopicInput !== "add-new-topic") {
                articleInfo.topic = selectTopicInput;
                postArticle(articleInfo).then(() => {
                    navigate("/");
                });
            } else {
                articleInfo.topic = newTopicInput.slug;
                postTopic(newTopicInput.slug, newTopicInput.description).then(
                    () => {
                        postArticle(articleInfo).then(() => {
                            navigate("/");
                        });
                    }
                );
            }
        } else {
            if (!isTitle) {
                setError((currError) => {
                    return {
                        ...currError,
                        titleError: "Please provide an article title.",
                    };
                });
            }
            if (!isSelectTopic) {
                setError((currError) => {
                    return {
                        ...currError,
                        selectTopicError: "Please select an article topic.",
                    };
                });
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
            if (!isBody) {
                setError((currError) => {
                    return {
                        ...currError,
                        bodyError: "Please provide an article body.",
                    };
                });
            }
            if (!isImg) {
                setError((currError) => {
                    return {
                        ...currError,
                        imgError: "Please provide an article image.",
                    };
                });
            }
        }
    }

    console.log(error);

    return (
        <>
            <AppBar />
            <section className="page-container">
                <h1>Post an article</h1>
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
                    ></input>
                    {error.titleError && (
                        <p className="error-text">{error.titleError}</p>
                    )}
                    <select
                        name="topics"
                        id="topics"
                        className="query-select"
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
                            />
                            <input
                                id="new-topic-description-input"
                                name="new-topic-description-input"
                                placeholder="Topic description..."
                                value={newTopicInput.description}
                                onChange={handleNewTopicDescriptionChange}
                                autoComplete="off"
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
                    ></input>
                    {error.imgError && (
                        <p className="error-text">{error.imgError}</p>
                    )}
                    <button type="submit">Create Article</button>
                </form>
            </section>
            ;
        </>
    );
}

export default PostArticlePage;
