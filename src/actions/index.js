import * as api from "../utils/api";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const VOTE = "VOTE";
export const CHANGE_SORT = "CHANGE_SORT";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const getPosts = () => dispatch =>
  api
    .getPosts()
    .then(posts =>
      Promise.all(
        posts.map(post =>
          api
            .getCommentsForPost(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        )
      )
    )
    .then(posts => dispatch(receivePosts(posts)));

export const addPost = (post) => ({
  type: ADD_POST,
  post
});

export const sendAddPost = (post) => dispatch =>
  api.addPost(post).then(post => dispatch(addPost(post)));

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId
});

export const sendDeletePost = postId => dispatch =>
  api.deletePost(postId).then(post => dispatch(deletePost(postId)));

export const votePost = post => ({
  type: VOTE,
  payload: post
});

export const sendVotePost = (postId, option) => dispatch =>
  api.postVote(postId, option).then(post => dispatch(votePost(post)));

export const changeSortAction = sort => {
  return {
    type: CHANGE_SORT,
    value: sort.value
  };
};
