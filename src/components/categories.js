import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
import * as actions from "../actions";

class ShowCategoryPosts extends Component {
  componentDidMount() {
    this.props.getPostsByCategory(this.props.match.params.category);
  }

  deletePost = postId => {
    this.props.sendDeletePost(postId);
  };

  render() {
    return(
      <div>
        CATEGORIES
      </div>
    );
  }
}

const mapStateToProps = ({ posts, sort }) => ({
  posts,
  sort
});

export default connect(mapStateToProps, actions)(ShowCategoryPosts);
