import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEditPost, fetchSinglePost } from "../actions";


const mapStateToProps = ({ posts }) => ({
  posts
});

export default connect(mapStateToProps, { fetchEditPost, fetchSinglePost })(
  EditPost
);