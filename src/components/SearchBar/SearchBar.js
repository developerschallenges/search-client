import React, {useState, useEffect} from 'react';

export default function SearchBar(props) {
    let [q, setQ] = useState(props.q);

    const onSearchHandler = () => {
        props.postSearchHandler(q);
    }

    const onEnterButton = (event) => {
        if (event.keyCode === 13) {
            onSearchHandler();
        }
    }

    const onChangeHandler = () => {
        var searchTerm = document.getElementById("search-box").value;
        setQ(searchTerm);

        // use this prop if you want to make the search more reactive
        if (props.searchChangeHandler) {
            props.searchChangeHandler(searchTerm);
        }
    }

    // https://stackoverflow.com/questions/58442168/why-useeffect-doesnt-run-on-window-location-pathname-changes
    // const useReactSearch = () => {
    //     const [locationSearch, setLocationSearch] = React.useState(window.location.search);
    //     const listenToPopstate = () => {
    //         const winSearch = window.location.search;
    //         setLocationSearch(winSearch);
    //     };
    //     React.useEffect(() => {
    //         window.addEventListener("popstate", listenToPopstate);
    //         return () => {
    //             window.removeEventListener("popstate", listenToPopstate);
    //         };
    //     }, []);
    //     return locationSearch;
    // };

    // const reactSearch = useReactSearch();
    // useEffect(() => {
    //     const newQ = new URLSearchParams(window.location.search).get('q');
    //     if (newQ !== q) {
    //         props.postSearchHandler(newQ);
    //     }
    // }, [reactSearch])

    const inputStyle = {
        padding: 10,
        fontSize: 38,
        letterSpacing: -1,
        color: 'rgb(85, 85, 85)',
        lineHeight: '1.3em',
        boxSizing: 'border-box',
        width: 'calc(100% - 80px)',
        border: '1px #3b8dbd solid',
        outline: 'none',
        WebkitApperance: 'none',
        borderRadius: 0
    }

    const buttonStyle = {
        width: '80px',
        border: '1px #3b8dbd solid',
        backgroundColor: '#3b8dbd',
        color: '#fafafa',
        padding: 12,
        fontSize: 38,
        position: 'absolute',
        cursor: 'pointer'
    }

    return (
        <div onKeyDown={e => onEnterButton(e)}>
            <input 
                autoComplete="off" // setting for browsers; not the app
                type="text"
                id="search-box"
                onChange={onChangeHandler}
                defaultValue={props.q}
                style={inputStyle}>
            </input>
            <button type="submit" onClick={onSearchHandler} style={buttonStyle}>
                <i id="icon-search" className="icon"></i>
            </button>
        </div>
    );
};