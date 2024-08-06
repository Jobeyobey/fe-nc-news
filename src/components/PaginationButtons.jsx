function PaginationButtons({ totalArticles, articlesPage, setArticlesPage }) {
    // Once num articles displayed can be picked, maxPageNum must be updated to be dynamic
    const maxPageNum = Math.ceil(totalArticles / 10);

    function handleClick(e) {
        let adjustment = 0;
        if (e.target.id === "page-back") {
            adjustment = -1;
        } else if (e.target.id === "page-next") {
            adjustment = 1;
        }

        setArticlesPage((currPage) => (currPage += adjustment));
    }

    return (
        <div className="pagination-container">
            {articlesPage > 1 && (
                <button id="page-back" onClick={handleClick}>
                    Back
                </button>
            )}
            <p>
                Page {articlesPage} of {maxPageNum}
            </p>
            {articlesPage < maxPageNum && (
                <button id="page-next" onClick={handleClick}>
                    Next
                </button>
            )}
        </div>
    );
}

export default PaginationButtons;
