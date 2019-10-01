class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);

        // Bind the event handlers to the correct instance.
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);

        // Set our parent default state.
        this.state = {
            options: []
        };
    }

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

    // Allows users to delete all options by passing down to the Options class component.
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    // Randomly select an option to do.
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum]);
    }

    // Add new option based on data based into the child AddOption class.
    handleAddOption(option) {
        if (!option) {
            return 'Enter a valid value to add.'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Enter a unique item to add.'
        } 

        // We use concat so that we don't manipulate the previous state, but instead return a new array value.
        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }));
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

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {
                props.subtitle && <h2>{props.subtitle}</h2>
            }
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button onClick={props.handlePick} disabled={!props.hasOptions}>
                What should I do?
            </button>
        </div>
    );
};

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

class AddOption extends React.Component {
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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));