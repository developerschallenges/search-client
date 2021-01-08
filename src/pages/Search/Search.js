import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress  from '@material-ui/core/CircularProgress';

import Results from '../../components/Results/Results';
import Pager from '../../components/Pager/Pager';
import SearchBar from '../../components/SearchBar/SearchBar';

import { baseApiUrl } from '../../contexts/AuthContext';

export default function Search() {  
  let location = window.location;
  let history = window.history;
  
  const [ results, setResults ] = useState([]);
  const [ resultCount, setResultCount ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ q, setQ ] = useState(new URLSearchParams(location.search).get('q') ?? "");
  const [ top ] = useState(new URLSearchParams(location.search).get('top') ?? 5);
  const [ skip, setSkip ] = useState(new URLSearchParams(location.search).get('skip') ?? 0);
  const [ filters, setFilters ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  let resultsPerPage = top;
  
  useEffect(() => {
    setIsLoading(true);
    setSkip((currentPage-1) * top);
    const body = {
      q: q,
      top: top,
      skip: skip,
      filters: filters
    };

    axios.post(baseApiUrl + '/api/search', body)
        .then( response => {
            setResults(response.data.results);
            setResultCount(response.data.count);
            setIsLoading(false);
        } )
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        });
    
  }, [q, top, skip, filters, currentPage]);

  // pushing the new search term to history when q is updated
  // allows the back button to work as expected when coming back from the details page
  useEffect(() => {
    if (history.pushState) {
      var newurl = window.location.origin + window.location.pathname + '?q=' + q;
      window.history.pushState({path:newurl},'',newurl);
    }
    setCurrentPage(1);
    setFilters([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);


  let postSearchHandler = (searchTerm) => {
    //console.log(searchTerm);
    setQ(searchTerm);
  }

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
        <Results documents={results} top={top} skip={skip} count={resultCount}></Results>
        <Pager currentPage={currentPage} resultCount={resultCount} resultsPerPage={resultsPerPage} setCurrentPage={setCurrentPage}></Pager>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <SearchBar postSearchHandler={postSearchHandler} q={q}></SearchBar>
      {body}
    </div>
  );
}
