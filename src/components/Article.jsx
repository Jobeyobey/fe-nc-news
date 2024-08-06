function Article({ topic, title, author, createdAt, votes, commentCount }) {
    const date = new Date(Date.parse(createdAt));
    return (
        <article className="list-article-container">
            <div className="list-article-top">
                <p>{topic}</p>
                <p>{date.toDateString()}</p>
            </div>
            <div>
                <h3>{title}</h3>
                <p>{author}</p>
            </div>
            <div className="list-article-bot">
                <p>Votes: {votes}</p>
                <p>Comments: {commentCount}</p>
            </div>
        </article>
    );
}

export default Article;
