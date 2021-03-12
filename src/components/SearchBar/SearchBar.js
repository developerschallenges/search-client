import React, {useEffect, useState} from 'react';

export default function SearchBar(props) {
    const [tempSearchPhrase, setTempSearchPhrase] = useState("");

    useEffect(() => {
        setTempSearchPhrase(props.searchPhrase)
    }, [props.searchPhrase])
    
    const onSearchHandler = () => {
        props.setSearchPhrase(tempSearchPhrase);
        if (window.history.pushState) {
            var newurl = window.location.origin + window.location.pathname + '?q=' + tempSearchPhrase;
            if (window.location.href !== newurl) {
                window.history.pushState('search-phrase', '', newurl);
            }
        }
    }

    const onEnterButton = (event) => {
        if (event.keyCode === 13) {
            onSearchHandler();
        }
    }

    const onChangeHandler = () => {
        var searchBoxValue = document.getElementById("search-box").value;
        setTempSearchPhrase(searchBoxValue);
    }

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
                autoComplete="off"
                type="text"
                id="search-box"
                onChange={onChangeHandler}
                value={tempSearchPhrase}
                style={inputStyle}>
            </input>
            <button type="submit" onClick={onSearchHandler} style={buttonStyle}>
                <i id="icon-search" className="icon"></i>
            </button>
        </div>
    );
};