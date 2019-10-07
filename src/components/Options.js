import React from 'react';
import Option from './Option';

// We can access the handleDeleteOptions method that was created in the parent class.
// It has access to the parent state by accessing the props that were passed down to the Options child.
// We access handleDeleteOptins by accessing this.props.
const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All Options.</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
};

export default Options;