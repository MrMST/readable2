import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uuidv1 from "uuid/v1";
import serializeForm from 'form-serialize'
import Timestamp from "react-timestamp";
import {
  getSinglePost,
  fetchComments,
  fetchAddComment,
  fetchDeleteComment,
  sendDeletePost
} from "../actions";

class ShowPost extends Component {

  state = {
    commentBody: "",
    commentAuthor: ""
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.post_id);
    this.setState({
      author: "",
      body: ""
    });
  }

  deletePost = postId => {
    this.props.deletePost(postId);
    this.props.history.push("/");
  };

  deleteComment = commentId => {
    this.props.deleteComment(commentId);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSaveComment = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true })
    this.props.addComment(values);


    // const { author, body } = this.state;
    // const data = {
    //   author: author,
    //   body: body
    // };
    // this.props.addComment(data, data.id);
    this.setState({
      author: "",
      body: ""
    });
  };

  render() {
    const { posts } = this.props.posts;
    const { comments } = this.props.comments;

    return (
      <div className="posts-wrapper">
        <div>Show Post</div>
        {
          posts && posts.length === 1 && posts.filter( post => !post.deleted).map(post => (
            <div key={post.id}>
              <input type='text' name='category' value={post.category} readOnly/>
              <input type='text' name='title' value={post.title} readOnly/>
              <input type='text' name='author' value={post.author} readOnly/>
              <textarea name='content' value={post.body} readOnly/>
              <Timestamp time={ post.timestamp / 1000 } format='full' />
              <div> Score { post.voteScore } </div>
              <div> Comment count {post.commentCount} </div>
              <button onClick={ () => this.deletePost(post.id) }>Delete Post</button>
              <Link to={`/editpost/${post.id}`}><button>Edit Post</button></Link>
              <div className="comments-wrapper">
                {
                  comments && comments.length && comments.filter ( comment => !comment.deleted ).map( comment => (
                    <div key={uuidv1()} className="comment">
                      <div>{comment.author}</div>
                      <div>{comment.body}</div>
                      <Timestamp time={ comment.timestamp / 1000 } format='full' />
                      <div>Score {comment.voteScore}</div>
                      <Link to={`/editcomment/${comment.id}`}><button>Edit Comment</button></Link>
                      <button onClick={ () => this.deleteComment(comment.id) }>Delete Comment</button>
                    </div>
                  ))
                }
                <div className="add-comment-wrapper">
                  <form onSubmit={ this.handleSaveComment }>
                    <input type="hidden"  name="id" value={uuidv1()}/>
                    <input type="hidden"  name="parentId" value={post.id}/>
                    <input type="hidden"  name="timestamp" value={Date.now()}/>
                    <input type="hidden"  name="deleted" value="false"/>
                    <input type="hidden"  name="parentDeleted" value="false"/>
                    <input type="hidden"  name="voteScore" value="1"/>

                    <input type='text' name='author' value={this.state.author} onChange={this.handleInputChange}/>
                    <textarea name='body' value={this.state.body}  onChange={this.handleInputChange}/>
                    <button>Save Comment</button>
                  </form>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

}

const mapStateToProps = ({ posts, comments }) => ({
  posts,
  comments
});

const mapDispatchToProps = dispatch => ({
  getPost: postId =>
    dispatch(getSinglePost(postId)).then(() =>
      dispatch(fetchComments(postId))
    ),
  deletePost: postId => dispatch(sendDeletePost(postId)),
  addComment: comment => dispatch(fetchAddComment(comment)),
  deleteComment: commentId => dispatch(fetchDeleteComment(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
