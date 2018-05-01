import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import Timestamp from "react-timestamp";

class MainPage extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  voteUp = (postId) => {
    this.props.sendVotePost(postId, "upVote");
  };

  voteDown = (postId) => {
    this.props.sendVotePost(postId, "downVote");
  };

  changeSorting = value => {
    this.props.changeSortAction({ value });
  }

  deletePost = postId => {
    this.props.sendDeletePost(postId);
  };

  render() {
    const { posts } = this.props.posts;
    const { sort } = this.props.sort;
    return (
      <div className="page-wrapper">
        <button onClick={ () => this.changeSorting('votescore') }>VoteScore</button>
        <button onClick={ () => this.changeSorting('timestamp') }>Timestamp</button>
        <hr/>
        <Link to="/addpost"><button>Add Post</button></Link>
        <div className="post-container">
        <ul>
        { posts && posts.length &&
          posts.filter(post => !post.deleted)
          .sort((a, b) => {
            switch (sort) {
              case "timestamp":
                return b.timestamp - a.timestamp;
              default:
                return b.voteScore - a.voteScore;
            }
          })
          .map(post => (

            <li key={ post.id }>
              <span>{post.category}</span><br/>
              <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link><br/>
              { post.author }<br/>
              <Timestamp time={ post.timestamp / 1000 } format='full' /><br/>
              <button onClick={ () => this.voteUp(post.id) }>Up</button>
              { post.voteScore }
              <button onClick={ () => this.voteDown(post.id) }>Down</button>
              <button onClick={ () => this.deletePost(post.id) }>Delete</button>
              <Link to={`/editpost/${post.id}`}><button>Edit</button></Link>
            </li>

        ))}
        </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, sort }) => ({
  posts,
  sort
});

export default connect(mapStateToProps, actions)(MainPage);