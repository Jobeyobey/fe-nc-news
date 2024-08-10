import { useContext, useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { getAllTopics } from "../api";

function PostArticlePage() {
    const [topics, setTopics] = useState([]);
    const [titleInput, setTitleInput] = useState("");
    const [selectTopicInput, setSelectTopicInput] = useState("");
    const [topicInput, setTopicInput] = useState("");
    const [bodyInput, setBodyInput] = useState("");
    const [imgURLInput, setImgURLInput] = useState("");

    useEffect(() => {
        getAllTopics().then((response) => {
            setTopics(response);
        });
    });

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
        setSelectTopicInput(e.target.value);
    }

    function handleTopicChange(e) {
        setTopicInput(e.target.value);
    }

    function handleBodyChange(e) {
        setBodyInput(e.target.value);
    }

    function handleURLInputChange(e) {
        setImgURLInput(e.target.value);
    }

    return (
        <>
            <AppBar />
            <section className="page-container">
                <h1>Post an article</h1>
                <form className="login-form">
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
                        {topicOptions}
                        <option value="add-new-topic">Add new topic</option>
                    </select>
                    {selectTopicInput === "add-new-topic" && (
                        <input
                            id="topic-input"
                            name="topic-input"
                            placeholder="Topic name..."
                            value={topicInput}
                            onChange={handleTopicChange}
                            autoComplete="off"
                        />
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
                </form>
            </section>
            ;
        </>
    );
}

export default PostArticlePage;
