import React, { Component } from 'react';
import './AddForm.css'
import TwitterInput from '../TwitterInput/TwitterInput';
import { connect } from 'react-redux'

import { submitPost } from '../../actions/post';

class AddForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chars_left: 140
        };
    }

    submission = (event) => {
        event.preventDefault();
        this.props.submitPost(this.state.postText);

        this.setState({
            postText: ''
        });
    }

    handleChange = (event) => {

        var input = event.target.value;

        if (input.length > 140) {
            return;
        }

        this.setState({
            postText: input,
            chars_left: 140 - input.length
        });


    }

    render() {
        return (
            <div className="container submitPost">
                <h2>Share your word on this wall to support the Lebanese Revolution</h2>
                <form className="form" onSubmit={event => this.submission(event)}>
                    <div className="form-group">
                        <textarea name="post123" onChange={this.handleChange} value={this.state.postText} maxLength="140" className="submitInput"></textarea>
                        <p>Characters Left: {this.state.chars_left}</p>
                        <input type="submit" className="submissionPost" value="Submit Post" />
                        <p style={{ marginTop: '12px' }}>Please don't swear and try to be gentle in your post - رجاءً لا للشتائم </p>
                        <p>Each person is allowed 1 Post per hour</p>
                        
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { submitPost })(AddForm);


