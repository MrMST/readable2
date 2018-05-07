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
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const GET_POSTS_CATEGORY = "GET_POSTS_CATEGORY";

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

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
});

export const receiveComment = comments => ({
  type: GET_COMMENT,
  comments
});

export const fetchComment = commentId => dispatch =>
  api.getSingleComment(commentId).then(comments => dispatch(receiveComment(comments)));

export const fetchAddComment = comment => dispatch =>
  api.addComment(comment).then(comment => dispatch(addComment(comment)));

export const deleteComment = commentId => ({
  type: DELETE_COMMENT,
  commentId
});

export const fetchDeleteComment = commentId => dispatch =>
  api.deleteComment(commentId).then(comment => dispatch(deleteComment(commentId)));

// export const receiveComments = postId => dispatch =>
//   api.getCommentsForPost(postId).then(comments => dispatch(getComments(comments)));
export const fetchComments = postId => dispatch =>
  api.getComments(postId).then(comments => dispatch(getComments(comments)));

  export const voteComment = (commentId, option) => ({
    type: VOTE_COMMENT,
    commentId
  });

export const sendVoteComment = (commentId, option) => dispatch =>
  api.voteComment(commentId, option).then(comment => dispatch(voteComment(comment)));

export const receiveSinglePost = posts => ({
  type: GET_SINGLE_POST,
  posts
});

export const editComment = (comment, commentId) => ({
  type: EDIT_COMMENT,
  comment,
  commentId
});

export const sendEditComment = (comment, commentId) => dispatch =>
  api.editComment(comment, commentId).then(comment => dispatch(editComment(comment)));

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

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch =>
  api
    .getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)));

export const getPostsCategory = posts => ({
  type: GET_POSTS_CATEGORY,
  posts
});

export const getPostsByCategory = category => dispatch =>
  api
    .getPostsForCategory(category)
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
    .then(posts => dispatch(getPostsCategory(posts)));

