import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import * as actions from "../actions";
import Timestamp from "react-timestamp";
import {
  getSinglePost,
  fetchComments,
  sendDeletePost
} from "../actions";

class ShowPost extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.post_id);
  }

  deletePost = postId => {
    this.props.deletePost(postId);
    this.props.history.push("/");
  };

  render() {
    const { posts } = this.props.posts;
    const { comments } = this.props.comments;

    return (
      <div className="wrapper">
        <div>Show Post</div>
        {
          posts && posts.length === 1 && posts.filter( post => !post.deleted).
          map(post => (
            <div key={post.id}>{post.id}
              <input type='text' name='category' value={post.category} readOnly/>
              <input type='text' name='title' value={post.title} readOnly/>
              <input type='text' name='author' value={post.author} readOnly/>
              <textarea name='content' value={post.body} readOnly/>
              <Timestamp time={ post.timestamp / 1000 } format='full' />
              <div> --- Score { post.voteScore } --- </div>
              <button onClick={ () => this.deletePost(post.id) }>Delete Post</button>
              <div className="comments-wrapper">
                {
                  comments && comments.length && comments.filter ( comment => !comment.deleted ).
                  map( comment => (
                    <div key={comment.id} className="comment">
                      <div>{comment.author}</div>
                      <div>{comment.body}</div>
                      <div>Score {comment.voteScore}</div>
                    </div>
                  ))
                }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
