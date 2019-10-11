import React from 'react';
import Modal from 'react-modal';

// No need for curly brackets and return keyword as arrow functions implicitly return.
const OptionModal = (props) => (
    // Using !! in isOpen sets props.selectedOption to a true Boolean. 
    // Default state of undefined will evaluate to false while strings will evaluate to true.
    // In IndecisionApp we update the state of selectedOption, which triggers the modal.
    <Modal 
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption} 
        contentLabel="Selected Option"
    >
        <h3>Selected Option</h3>
        {/* Use logical and operator to display or hide paragraph based on whether selectedOption is undefined. */}
        {props.selectedOption && <p>{props.selectedOption}</p>}
        <button onClick={props.handleClearSelectedOption}>Okay</button>
    </Modal>
);

export default OptionModal;