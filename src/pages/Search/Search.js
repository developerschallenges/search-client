import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import useBrowserHistory from 'use-browser-history'

import Results from '../../components/Results/Results';
import Pager from '../../components/Pager/Pager';
import SearchBar from '../../components/SearchBar/SearchBar';

import { baseApiUrl } from '../../contexts/AuthContext';

export default function Search() {
    let location = window.location;

    const [searchPhrase, setSearchPhrase] = useState(new URLSearchParams(location.search).get('q') ?? "");
    const [currentPage, setCurrentPage] = useState(1);

    const [results, setResults] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [top] = useState(new URLSearchParams(location.search).get('top') ?? 5);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = (searchPhrase, page) => {
        const skip = (page - 1) * top;
        const searchBody = {
            q: searchPhrase,
            top: top,
            skip: skip
        };

        setIsLoading(true);
        axios.post(baseApiUrl + '/api/search', searchBody)
            .then(response => {
                setResults(response.data.results);
                setResultCount(response.data.count);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (currentPage === 1) {
            fetchData(searchPhrase, currentPage);
        } else {
            setCurrentPage(1);
        }
    }, [searchPhrase]);

    useEffect(() => {
        fetchData(searchPhrase, currentPage);
    }, [currentPage]);

    const containerStyle = {
        position: 'relative'
    }

    const circularProgressStyle = {
        position: 'absolute',
        top: 16,
        left: 'calc(100% - 136px)'
    }

    var body;
    if (isLoading) {
        body = (
            <div style={circularProgressStyle}>
                <CircularProgress />
            </div>);
    } else {
        body = (
            <div>
                <Results documents={results}></Results>
                <Pager currentPage={currentPage} resultCount={resultCount} resultsPerPage={top} setCurrentPage={setCurrentPage}></Pager>
            </div>
        )
    }

    const onHistoryHandler = () => {
        var searchPhrase = new URLSearchParams(location.search).get('q') ?? "";
        setSearchPhrase(searchPhrase);
    }

    useBrowserHistory(null, false, onHistoryHandler, onHistoryHandler);

    return (
        <div style={containerStyle}>
            <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}></SearchBar>
            {body}
        </div>
    );
}
