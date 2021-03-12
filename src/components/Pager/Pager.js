import React, { useState, useEffect } from 'react';

export default function Pager(props) {
    let totalPages = Math.ceil(props.resultCount / props.resultsPerPage);

    function goToNextPage(e) {
        e.preventDefault();
        props.setCurrentPage(props.currentPage + 1);
    }

    function goToPreviousPage(e) {
        e.preventDefault();
        props.setCurrentPage(props.currentPage - 1);
    }

    var i = 0;
    var page_links = [];

    var minPage = 1;
    var maxPage = totalPages;

    if (props.currentPage - minPage > 2) {
        minPage = props.currentPage - 2;
    }

    if (maxPage - props.currentPage > 2) {
        maxPage = parseInt(props.currentPage) + 2;
    }

    if (minPage >= 2) {
        page_links.push(
            <a className="page-number" href="" onClick={(e) => { e.preventDefault(); props.setCurrentPage(1); }} key={"1"}>1</a>
        );
    }

    if (minPage > 2) {
        page_links.push(
            <span className="space" key={"space"}>…</span>
        );
    }

    for (i = minPage; i <= maxPage; i++) {
        if (i === parseInt(props.currentPage)) {
            page_links.push(
                <span className="page-number current" key={i}>{i}</span>
            );
        } else {
            page_links.push(
                <a className="page-number" href="" onClick={function () { var page = i; return function (e) { e.preventDefault(); props.setCurrentPage(page); } }()} key={i}>{i}</a>
            );
        }
    }

    if (maxPage < totalPages - 1) {
        page_links.push(
            <span className="space" key={"space"}>…</span>
        );
    }

    if (maxPage <= totalPages - 1) {
        page_links.push(
            <a className="page-number" href="" onClick={(e) => { e.preventDefault(); props.setCurrentPage(totalPages); }} key={totalPages}>{totalPages}</a>
        );
    }

    var previousButton;
    if (parseInt(props.currentPage) !== 1) {
        previousButton = (<a className="extend prev" rel="prev" href="" onClick={goToPreviousPage}>«</a>);
    }

    var nextButton;
    if (parseInt(props.currentPage) !== totalPages) {
        nextButton = (<a className="extend next" rel="next" href="" onClick={goToNextPage}>»</a>);
    }

    return (
        (totalPages > 0) &&
        <nav id="page-nav">
            <span className="pages">Page {props.currentPage} of {totalPages}</span>
            {previousButton}
            {page_links}
            {nextButton}
        </nav>
    );
}