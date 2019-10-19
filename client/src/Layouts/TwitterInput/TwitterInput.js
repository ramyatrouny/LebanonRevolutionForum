import React, { Component } from 'react'

export default class TwitterInput extends Component {
    

    constructor(props) {
        super(props);

        this.state = {
            chars_left: 140
        };
    }

    handleChange = (event) => {

        var input = event.target.value;

        if(input.length > 140){
            return;
        }

        this.setState({
            chars_left: 140 - input.length
        });

        this.props.handleInput(input);
    }
    render() {
        return (
            <div>
                <textarea name="post123" onChange={this.inputSubmission} maxLength="140" className="submitInput"></textarea>
                <p>Characters Left: {this.state.chars_left}</p>
            </div>
        )
    }
}
