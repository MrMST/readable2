import React, { Component } from "react";
import { connect } from "react-redux";
import { sendEditPost, getSinglePost } from "../actions";

class EditPost extends Component {
  state = {
    id: "",
    category: "",
    title: "",
    author: "",
    content: ""
  };

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getSinglePost(postId).then(() => {
      const { id, title, author, body, category } = this.props.posts.posts[0];
      this.setState({
        id: id,
        title: title,
        author: author,
        content: body,
        category: category
      });
    });
  }

  setCategory = (event) => {
    this.setState({ category: event.target.value });
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, title, category, content, author } = this.state;
    const data = {
      id: id,
      title: title,
      body: content,
      author: author,
      category: category
    };
    this.props.sendEditPost(data, data.id);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="wrapper">
        <div>Edit Post</div>
        <form onSubmit={ this.handleSubmit }>
          <label>
            Select a category:
            <select name="category" value={this.state.category} onChange={this.setCategory}>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
          </label>
          <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange}/>
          <input type='text' name='author' value={this.state.author}  onChange={this.handleInputChange}/>
          <textarea name='content' value={this.state.content}  onChange={this.handleInputChange}/>
          <button>Save Post</button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = ({ posts }) => ({
  posts
});

export default connect(mapStateToProps, { sendEditPost, getSinglePost })(
  EditPost
);