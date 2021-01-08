import React from 'react';

export default function Result(props) {
    return (
        <div className="article-row">
            <article className="article article-summary">
                <div className="article-summary-inner">
                    <h2 className="article-title">
                        <a href={`/${props.document.path}`} className="title">{props.document.title}</a>
                    </h2>
                    <p className="article-excerpt">
                        {props.document.excerpt}
                    </p>
                </div>
            </article>
        </div>
    );
}
