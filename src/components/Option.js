import React from 'react';

// Maintain Option variable so that React Dev Tools displays valid name. Export below to maintain.
const Option = (props) => (
    <div className="option">
        <p className="option__text">{props.count}. {props.optionText}</p>    
        <button
            className="button button--link"
            onClick={(e) => {
                props.handleDeleteOption(props.optionText);
            }}
        >
            Remove
        </button>
    </div>
);

export default Option;