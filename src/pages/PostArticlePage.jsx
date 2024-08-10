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
            setError({ msg: "Please fill in all parts of the form" });
        }
    }

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
                        </>
                    )}
                    <textarea
                        id="body-input"
                        name="body-input"
                        placeholder="Post body here..."
                        onChange={handleBodyChange}
                        value={bodyInput}
                    />
                    <input
                        id="img-url-input"
                        name="img-url-input"
                        placeholder="Image URL..."
                        value={imgURLInput}
                        onChange={handleURLInputChange}
                        autoComplete="off"
                    ></input>
                    <button type="submit">Create Article</button>
                    {error.msg !== "" && (
                        <p className="error-text">{error.msg}</p>
                    )}
                </form>
            </section>
            ;
        </>
    );
}

export default PostArticlePage;
