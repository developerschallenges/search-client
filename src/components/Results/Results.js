import React from 'react';
import Result from './Result/Result';

export default function Results(props) {

    let results = props.documents.map((result, index) => {
        return <Result
            key={index}
            document={result.document}
        />;
    });

    return (
        <>
            {results}
        </>
    );
};
