import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Timestamp from "react-timestamp"
import {
  fetchCategories,
  getPosts,
  sendVotePost,
  sendDeletePost,
  changeSortAction
} from "../actions"

class MainPage extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.fetchCategories();
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
    const { categories } = this.props;
    const { sort } = this.props.sort;
    return (
      <div className="wrapper">
      <div>Main Page</div>
        <ul>
          <li><Link to={"/"} key="all"><button>All</button></Link></li>
          {
          categories && categories.categories && categories.categories.length && categories.categories.map( category =>(
            <li key={category.name}><Link to={`/${category.path}`}><button>{ category.name }</button></Link></li>
           ))
          }
        </ul>
        <button onClick={ () => this.changeSorting('votescore') }>VoteScore</button>
        <button onClick={ () => this.changeSorting('timestamp') }>Timestamp</button>

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
              <br/>--- Comment count {post.commentCount} <br/>
              <button onClick={ () => this.voteUp(post.id) }>Up</button>
              { post.voteScore }
              <button onClick={ () => this.voteDown(post.id) }>Down</button>
              <button onClick={ () => this.deletePost(post.id) }>Delete Post</button>
              <Link to={`/editpost/${post.id}`}><button>Edit Post</button></Link>
            </li>

        ))}
        </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories, sort }) => ({
  posts,
  categories,
  sort
});

export default connect(mapStateToProps, {
  getPosts,
  fetchCategories,
  sendVotePost,
  sendDeletePost,
  changeSortAction
})(MainPage);
