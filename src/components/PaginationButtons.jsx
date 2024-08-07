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
            {currPage > 1 && (
                <button id="page-back" onClick={handleClick}>
                    Back
                </button>
            )}
            <p>
                Page {currPage} of {maxPageNum}
            </p>
            {currPage < maxPageNum && (
                <button id="page-next" onClick={handleClick}>
                    Next
                </button>
            )}
        </div>
    );
}

export default PaginationButtons;
