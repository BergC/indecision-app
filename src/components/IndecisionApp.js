import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';

export default class IndecisionApp extends React.Component {
    state = {
        options: []
    };

    // Allows users to delete all options by passing down to the Options class component.
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    };

    // Randomly select an option to do.
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum]);
    };

    // Add new option based on data based into the child AddOption class.
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter a valid value to add.'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Enter a unique item to add.'
        } 

        // We use concat so that we don't manipulate the previous state, but instead return a new array value.
        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }));
    };

    // DOM mount lifecycle method for fetching data.
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do nothing if data is poor quality.
        }
    }

    // Lifecycle method that fires after components or props update used here for saving data.
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    // Lifecycle method that fires before component is removed from DOM.
    componentWillUnmount() {
        console.log('unmount');
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer.';

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                    handleAddOption={this.handleAddOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}