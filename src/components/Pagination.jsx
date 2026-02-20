import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, itemsPerPage, total, onPageChange, onItemsPerPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 9) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else if (currentPage <= 5) {
            for (let i = 1; i <= 7; i++) pages.push(i);
            pages.push("..."); pages.push(totalPages);
        } else if (currentPage >= totalPages - 4) {
            pages.push(1); pages.push("...");
            for (let i = totalPages - 6; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1); pages.push("...");
            for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
            pages.push("..."); pages.push(totalPages);
        }
        return pages;
    };

    if (!totalPages || totalPages < 1) return null;

    const btnBase = "min-w-[34px] h-8 px-2 flex items-center justify-center rounded-lg text-sm font-medium transition-all border";

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-2 border-t border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{total} task{total !== 1 ? "s" : ""}</span>
                <span className="text-slate-300">·</span>
                <span>Per page</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(e.target.value)}
                    className="px-2 py-1 rounded-lg border border-slate-200 text-sm bg-white outline-none cursor-pointer"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>

            <div className="flex items-center gap-1">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
                    className={`${btnBase} border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed`}>
                    <ChevronLeft size={14} />
                </button>

                {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                        <span key={`e-${i}`} className="px-1 text-slate-400 text-sm select-none">…</span>
                    ) : (
                        <button key={page} onClick={() => onPageChange(page)}
                            className={`${btnBase} ${currentPage === page
                                ? "bg-green-600 border-green-600 text-white shadow-sm shadow-green-200"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
                            {page}
                        </button>
                    )
                )}

                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
                    className={`${btnBase} border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed`}>
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}

export default Pagination;
