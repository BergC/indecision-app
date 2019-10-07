import React from 'react';

export default class AddOption extends React.Component {
    constructor(props) {
        super(props);

        // Bind the event handler to the correct instance.
        this.handleAddOption = this.handleAddOption.bind(this);

        // Default state.
        this.state = {
            error: undefined 
        };
    }

    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        // Allows us to pass the added option data up to the parent by calling the parent handleAddOption method.
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input placeholder="Type your option here." type="text" name="option"></input>
                    <button>Add Option.</button>
                </form>
            </div>
        );
    }
}