import * as api from "../utils/api";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const GET_SINGLE_POST = "GET_SINGLE_POST";
export const EDIT_POST = "EDIT_POST";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const GET_COMMENT = "GET_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const VOTE = "VOTE";
export const CHANGE_SORT = "CHANGE_SORT";
export const VOTE_COMMENT = "VOTE_COMMENT";

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
            .getComments(post.id)
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

export const editPost = (post, postId) => ({
  type: EDIT_POST,
  post,
  postId
});
export const sendEditPost = (post, postId) => dispatch =>
  api.editPost(post, postId).then(post => dispatch(editPost(post)));

export const getComments = comments => ({
  type: GET_COMMENTS,
  comments
});
// export const receiveComments = postId => dispatch =>
//   api.getCommentsForPost(postId).then(comments => dispatch(getComments(comments)));
export const fetchComments = postId => dispatch =>
  api.getComments(postId).then(comments => dispatch(getComments(comments)));

export const receiveSinglePost = posts => ({
  type: GET_SINGLE_POST,
  posts
});

export const getSinglePost = postId => dispatch =>
  api.getSinglePost(postId).then(posts => dispatch(receiveSinglePost(posts)));

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
