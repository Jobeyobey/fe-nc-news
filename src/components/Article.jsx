import { Link } from "react-router-dom";
import { dateToString } from "../utils";

function Article({
    articleId,
    imgURL,
    topic,
    title,
    author,
    createdAt,
    votes,
    commentCount,
}) {
    const date = dateToString(createdAt);

    return (
        <article>
            <Link
                to={`/article/${articleId}`}
                className="list-article-container"
            >
                <img className="list-article-image" src={imgURL} />
                <div className="list-article-info">
                    <div className="list-article-top">
                        <p className="article-topic">{topic}</p>
                        <p className="list-article-date">{date}</p>
                    </div>
                    <div>
                        <h2 className="article-title">{title}</h2>
                        <p>by {author}</p>
                    </div>
                    <div className="list-article-bot">
                        <p>{votes} votes</p>
                        <p>{commentCount} comments</p>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default Article;
