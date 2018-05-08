import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {
  sendVotePost,
  sendDeletePost
} from "../actions"
import Timestamp from "react-timestamp"

class Post extends Component {

  voteUp = (postId) => {
    this.props.sendVotePost(postId, "upVote");
  };

  voteDown = (postId) => {
    this.props.sendVotePost(postId, "downVote");
  };

  deletePost = postId => {
    this.props.sendDeletePost(postId);
  };

  render() {
    const { post } = this.props;
    return(
      <li key={ post.id }>
      <div className="post">
          <span>{post.category}</span><br/>
          <Link to={`/show/${post.id}`}>{ post.title }</Link><br/>
          { post.author }<br/>
          <Timestamp time={ post.timestamp / 1000 } format='full' /><br/>
          <br/>Comment count {post.commentCount} <br/>
          <button onClick={ () => this.voteUp(post.id) }>Up</button>
          { post.voteScore }
          <button onClick={ () => this.voteDown(post.id) }>Down</button>
          <button onClick={ () => this.deletePost(post.id) }>Delete Post</button>
          <Link to={`/editpost/${post.id}`}><button>Edit Post</button></Link>
        </div>
      </li>
    )
  }
}

export default connect(null, {
  sendVotePost,
  sendDeletePost
})(Post);