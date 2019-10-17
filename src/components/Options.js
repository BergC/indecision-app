import React from 'react';
import Option from './Option';

// We can access the handleDeleteOptions method that was created in the parent class.
// It has access to the parent state by accessing the props that were passed down to the Options child.
// We access handleDeleteOptins by accessing this.props.
const Options = (props) => (
    <div>
        <div className="widget-header">       
            <h3 className="widget-header__title">Your Options</h3>
            <button
                className="button button--link" 
                onClick={props.handleDeleteOptions}
            >
                Remove All
            </button>
        </div>
        {props.options.length === 0 && <p className="widget__message">Please add an option to get started!</p>}
        {
            props.options.map((option, index) => (
                <Option
                    key={option}
                    optionText={option}
                    count={index + 1}
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))
        }
    </div>
);

export default Options;