import { Link } from "react-router-dom";
import { dateToString } from "../utils";

function Article({
    articleId,
    topic,
    title,
    author,
    createdAt,
    votes,
    commentCount,
}) {
    const date = dateToString(createdAt);

    return (
        <article className="list-article-container">
            <div className="list-article-top">
                <p>{topic}</p>
                <p>{date}</p>
            </div>
            <div>
                <h3>{title}</h3>
                <p>{author}</p>
            </div>
            <div className="list-article-bot">
                <p>Votes: {votes}</p>
                <p>Comments: {commentCount}</p>
                <Link to={`/article/${articleId}`}>To Article →</Link>
            </div>
        </article>
    );
}

export default Article;
