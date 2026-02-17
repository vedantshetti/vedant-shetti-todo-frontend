function Pagination({ currentPage, totalPages, itemsPerPage, onPageChange, onItemsPerPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 9;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 5) {
                for (let i = 1; i <= 7; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 4) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 6; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="pagination-container">
            <div className="records-per-page">
                <span>Records Per Page</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(e.target.value)}
                    className="page-size-select"
                >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>

            <div className="pagination-controls">
                <button
                    className="page-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;&lt;
                </button>

                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
                    ) : (
                        <button
                            key={page}
                            className={`page-btn ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    className="page-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
}

export default Pagination;
