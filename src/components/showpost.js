import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
import {
  getSinglePost,
  fetchComments
} from "../actions";

class ShowPost extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.post_id);
    // this.props.getPost(post_id).then(() => {
    //     const { id, title, author, body, category, voteScore } = this.props.posts.posts[0];
    //     this.setState({
    //       id: id,
    //       title: title,
    //       author: author,
    //       content: body,
    //       category: category,
    //       voteScore: voteScore
    //     });
    // });
  }

  render() {
    const { posts } = this.props.posts;

    console.log(this.props)

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
  //dispatch(getSinglePost(postId))
  //dispatch(fetchComments(postId)),
    dispatch(getSinglePost(postId)).then(() =>
      dispatch(fetchComments(postId))
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
