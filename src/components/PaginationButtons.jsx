function PaginationButtons({ totalCount, currPage, setCurrPage }) {
    // Once num articles displayed can be picked, maxPageNum must be updated to be dynamic
    const maxPageNum = Math.ceil(totalCount / 10);

    function handleClick(e) {
        let adjustment = 0;
        if (e.target.id === "page-back") {
            adjustment = -1;
        } else if (e.target.id === "page-next") {
            adjustment = 1;
        }

        setCurrPage((currPage) => (currPage += adjustment));
    }

    return (
        <div className="pagination-container">
            <button
                id="page-back"
                onClick={handleClick}
                className={`pagination-btn ${
                    currPage > 1 ? "" : "pagination-disabled"
                }`}
                disabled={currPage > 1 ? false : true}
            >
                Back
            </button>
            {maxPageNum > 1 && (
                <p>
                    Page {currPage} of {maxPageNum}
                </p>
            )}
            <button
                id="page-next"
                onClick={handleClick}
                className={`pagination-btn ${
                    currPage < maxPageNum ? "" : "pagination-disabled"
                }`}
                disabled={currPage < maxPageNum ? false : true}
            >
                Next
            </button>
        </div>
    );
}

export default PaginationButtons;
