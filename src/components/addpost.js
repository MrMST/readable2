import React, { Component } from "react";
import { connect } from "react-redux";
import { sendAddPost } from "../actions";
import uuidv1 from "uuid/v1";
import serializeForm from 'form-serialize'

class AddPost extends Component {
  state = {
    category: "react",
     title: "",
     author: "",
     content: ""
  };

  setCategory = (event) => {
    this.setState({ category: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    this.props.sendAddPost(values);
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="wrapper">
        <div>Add Post</div>
        <form onSubmit={ this.handleSubmit }>
          <input type="hidden"  name="id" value={uuidv1()}/>
          <input type="hidden"  name="timestamp" value={Date.now()}/>
          <input type="hidden"  name="deleted" value="false"/>
          <input type="hidden"  name="voteScore" value="1"/>
          <label>
            Select a category:
            <select name="category" value={this.state.category} onChange={this.setCategory}>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
          </label>
          <input type='text' name='title' placeholder='Title'/>
          <input type='text' name='author' placeholder='Author'/>
          <textarea name='body' value={this.state.body}/>
          <button>Save Post</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { sendAddPost })(AddPost);
