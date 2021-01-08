import React, {useState, useEffect} from 'react';

export default function Pager(props) {
    let [selectedPage, setSelectedPage] = useState(props.currentPage);
    let totalPages = Math.ceil(props.resultCount / props.resultsPerPage);

    useEffect(_=>{
        props.setCurrentPage(selectedPage);
    }, [selectedPage, props]);

    function goToNextPage() {
        setSelectedPage(selectedPage + 1);
    }

    function goToPreviousPage() {
        setSelectedPage(selectedPage - 1);
    }

    var i = 0;
    var page_links = [];

    var minPage = 1;
    var maxPage = totalPages;

    if (selectedPage - minPage > 2) {
        minPage = selectedPage - 2;
    }

    if (maxPage - selectedPage > 2) {
        maxPage = parseInt(selectedPage) + 2;
    }

    if (minPage >= 2) {
        page_links.push(
            <a class="page-number" href="#" onClick={ () => setSelectedPage(1) }>1</a>
        );
    }

    if (minPage > 2) {
        page_links.push(
            <span class="space">…</span>
        );  
    }

    for (i = minPage; i <= maxPage; i++) {
        if (i === parseInt(selectedPage)) {
            page_links.push(
                <span class="page-number current">{i}</span>
            );
        } else {
            page_links.push(
                <a class="page-number" href="#" onClick={function() { var page = i; return function() { setSelectedPage(page) }}()}>{i}</a>
            );
        }
    }

    if (maxPage < totalPages - 1) {
        page_links.push(
            <span class="space">…</span>
        );  
    }

    if (maxPage <= totalPages - 1) {
        page_links.push(
            <a class="page-number" href="#" onClick={ () => setSelectedPage(totalPages) }>{totalPages}</a>
        );
    }

    var previousButton;
    if (parseInt(selectedPage) !== 1) {
        previousButton = (<a class="extend prev" rel="prev" href="#" onClick={goToPreviousPage}>«</a>);
    }

    var nextButton;
    if (parseInt(selectedPage) !== totalPages) {
        nextButton = (<a class="extend next" rel="next" href="#" onClick={goToNextPage}>»</a>);
    }   

    return (
        (totalPages > 0) &&
        <nav id="page-nav">
            <span class="pages">Page {props.currentPage} of {totalPages}</span>
            {previousButton}
            {page_links}
            {nextButton}
        </nav>
    );
}