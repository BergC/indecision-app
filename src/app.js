class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);

        // Bind the event handler to the correct instance.
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);

        // Set our parent default state.
        this.state = {
            options: ['Thing one', 'Thing two', 'Thing three']
        };
    }

    // Allows users to delete all options by passing down to the Options class component.
    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            };
        });
    }

    // Randomly select an option to do.
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum]);
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer.';

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handlePick} disabled={!this.props.hasOptions}>
                    What should I do?
                </button>
            </div>
        );
    }
}

class Options extends React.Component {

    // We can access the handleDeleteOptions method that was created in the parent class, which has access to the parent state, by access the props that were passed down to the Options child.
    // This can be done by accessing this.props.
    render() {
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>Remove All Options.</button>
                {
                    this.props.options.map((option) => <Option key={option} optionText={option} />)
                }
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
            </div>
        );
    }
}

class AddOption extends React.Component {
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        if(option) {
            alert(option);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input placeholder="Type your option here." type="text" name="option"></input>
                    <button>Add Option.</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));