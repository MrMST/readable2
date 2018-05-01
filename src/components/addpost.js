import React, { Component } from "react";
import { connect } from "react-redux";
import { sendAddPost } from "../actions";
import uuidv1 from "uuid/v1";
import serializeForm from 'form-serialize'

class AddPost extends Component {
  //State to keep track of the post details.
  state = {
    category: "react",
    title: "",
    author: "",
    content: ""
  };

  // handleInputChange = e => {
  //   const value = e.target.value;
  //   const name = e.target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const data = {
  //     id: uuidv1(),
  //     timestamp: Date.now(),
  //     title: this.state.postTitle,
  //     body: this.state.postContent,
  //     author: this.state.postAuthor,
  //     category: this.state.postCategory,
  //     deleted: false,
  //     voteScore: 1
  //   };
  //   this.props.sendAddPost(data);
  //   this.props.history.push("/");
  // };

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    this.props.sendAddPost(values);
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="page-wrapper">
        <form onSubmit={ this.handleSubmit }>
          <input type="hidden"  name="id" value={uuidv1()}/>
          <input type="hidden"  name="timestamp" value={Date.now()}/>
          <input type="hidden"  name="deleted" value="false"/>
          <input type="hidden"  name="voteScore" value="1"/>
          <label>
            Select a category:
            <select name="category" value={this.state.value} onChange={this.handleChange}>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
          </label>
          <input type='text' name='title' placeholder='Title'/>
          <input type='text' name='author' placeholder='Author'/>
          <button>Add Post</button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = ({ }) => ({

// });

// export default connect(mapStateToProps, { sendAddPost} )(AddPost);

export default connect(null, { sendAddPost })(AddPost);
