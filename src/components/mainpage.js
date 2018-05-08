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
      <div className="siimple-grid">
        <div className="siimple-grid-row">
          <div className="siimple-grid-col siimple-grid-col--12">
            <div className="siimple-box siimple-box--purple">
              <div className="siimple-box siimple-box--navy">
                <h1>Main Page</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="siimple-grid-row">
          <div class="siimple-grid-col siimple-grid-col--4">
            <div className="grid-container">
              Choose Category
              <Link to={"/"} key="all" className="siimple-navbar-link">All</Link>
              { categories && categories.categories && categories.categories.length && categories.categories.map( category =>(
              <Link to={`/${category.path}`} key={ category.name } className="siimple-navbar-link">{ category.name }</Link>
              ))
              }
            </div>
          </div>
          <div class="siimple-grid-col siimple-grid-col--8">
            <div className="grid-container">
              Choose Sorting
              <span className="siimple-navbar-link" onClick={ () => this.changeSorting('votescore') }>Score</span>
              <span className="siimple-navbar-link" onClick={ () => this.changeSorting('timestamp') }>Time</span>
              <Link className="siimple-btn" to="/addpost">Add Post</Link>
            </div>
          </div>
        </div>
        <div className="siimple-grid-col siimple-grid-col--12">

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
            <div className="siimple-box siimple-box--purple">
              <div className="siimple-box siimple-box--white">
                <div className="siimple-label">Category</div>
                <span>{post.category}</span><br/>
                <div className="siimple-label">Title</div>
                <Link to={`/show/${post.id}`}>{ post.title }</Link><br/>
                <div className="siimple-label">Author</div>
                { post.author }<br/>
                <div className="siimple-label">Time</div>
                <Timestamp time={ post.timestamp / 1000 } format='full' /><br/>
                <div className="siimple-label">Comments</div>
                { post.commentCount } <br/>
                <div className="siimple-label">Score</div>
                <span className="siimple-btn siimple-btn--navy" onClick={ () => this.voteUp(post.id) }>+</span>
                &nbsp;&nbsp;{ post.voteScore }&nbsp;&nbsp;
                <span className="siimple-btn siimple-btn--navy" onClick={ () => this.voteDown(post.id) }>-</span><br/>
                <span className="siimple-btn" onClick={ () => this.deletePost(post.id) }>Delete Post</span>
                <Link className="siimple-btn" to={`/editpost/${post.id}`}>Edit Post</Link>
                <br/>
              </div>
            </div>
          ))}
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
