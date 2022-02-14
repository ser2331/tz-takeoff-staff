import React from 'react';
import './pagination.scss';
import { useDispatch, useSelector } from 'react-redux';
import { app as action } from '../../store/actions/app';

const Pagination = () => {
    const dispatch = useDispatch();

    const peopleList = useSelector((state) => state.app.people);
    const currentPage = useSelector((state) => state.app.currentPage);
    const pageSize = useSelector((state) => state.app.pageSize);

    const setPage = (id) => dispatch(action.setPage(id));

    const totalCount = peopleList.length;

    const pagesCount = Math.ceil(totalCount / pageSize);

    let startPage;
    let endPage;

    if (pagesCount <= 10) {
        startPage = 1;
        endPage = pagesCount;
    } else if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
    } else if (currentPage + 4 >= pagesCount) {
        startPage = pagesCount - 9;
        endPage = pagesCount;
    } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
    }

    const pages = [...Array((endPage + 1) - startPage).keys()].map((i) => startPage + i);

    return (
        <div className="demo">
            <nav className="pagination-outer">
                <ul className="pagination">
                    {
                        currentPage <= 1
                            ? null
                            : (
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => setPage(currentPage - 1)}
                                >
                                    «
                                </button>
                            )
                    }
                    {
                        currentPage >= 3
                            ? (
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => setPage(1)}
                                >
                                    First
                                </button>
                            ) : null
                    }
                    {
                        pages.map((page) => (
                            <button
                                type="button"
                                onClick={() => setPage(page)}
                                key={page}
                                className={currentPage === page ? 'page-link active' : 'page-link'}
                            >
                                {page}
                            </button>
                        ))
                    }
                    {
                        currentPage >= pagesCount - 1
                            ? null
                            : (
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => setPage(pagesCount)}
                                >
                                    Last
                                </button>
                            )
                    }
                    {
                        currentPage === endPage ? null
                            : (
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => setPage(currentPage + 1)}
                                >
                                    »
                                </button>
                            )
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
