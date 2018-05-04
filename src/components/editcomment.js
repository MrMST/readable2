import React, { Component } from "react";
import { connect } from "react-redux";
import { sendEditComment, fetchComment } from "../actions";

class EditComment extends Component {
    state = {
      author: "",
      content: ""
    };

    componentDidMount() {
      this.props.fetchComment(this.props.match.params.commentId).then(() => {
        const { author, body } = this.props.receiveComment;
        this.setState({
          author: author,
          content: body
        });
      });
    }

    handleSubmit = e => {
      e.preventDefault();
      const { content, author } = this.state;
      const data = {
        id: this.props.receiveComment.id,
        body: content,
        author: author
      };
      this.props.sendEditComment(data, data.id);
      //this.props.history.goBack();
      //this.props.history.push("/");
    };

    handleInputChange = e => {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    };

    render() {
      return (
        <div className="wrapper">
          <div>Edit Comment</div>
          <form onSubmit={ this.handleSubmit }>
            <input type='text' name='author' value={this.state.author} onChange={this.handleInputChange}/>
            <textarea name='content' value={this.state.content}  onChange={this.handleInputChange}/>
            <button>Save Comment</button>
          </form>
        </div>
      );
    }
}

const mapStateToProps = ({ receiveComment }) => ({
    receiveComment
  });

export default connect(mapStateToProps, { sendEditComment, fetchComment })(
  EditComment
);