import { dateToString } from "../utils";

function Comment({ author, createdAt, body }) {
    const dateString = dateToString(createdAt);

    return (
        <div className="comment-container">
            <div className="comment-top">
                <p>{author}</p>
                <p>{dateString}</p>
            </div>
            <p>{body}</p>
        </div>
    );
}

export default Comment;
