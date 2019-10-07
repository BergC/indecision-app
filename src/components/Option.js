import React from 'react';

// Maintain Option variable so that React Dev Tools displays valid name. Export below to maintain.
const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    );
};

export default Option;