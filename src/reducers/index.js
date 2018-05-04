import { combineReducers } from "redux";
import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  GET_SINGLE_POST,
  DELETE_POST,
  VOTE,
  CHANGE_SORT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT,
  GET_COMMENTS,
  ADD_COMMENT,
  VOTE_COMMENT
} from "../actions";

function posts(state = {}, action) {
  console.log('in posts type:' + action.type)
  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...state, posts: action.posts };
    case GET_SINGLE_POST:
      return { ...state, posts: [action.posts] };
    case ADD_POST:
      return {
        ...state,
        ...action.post
      };
    case DELETE_POST:
      const availablePosts = state.posts.filter(
        item => item.id !== action.postId
      );
      return {
        ...state,
        posts: availablePosts
      };
    case EDIT_POST:
      return { ...state, ...action.post };
    case VOTE:
      const updatedPosts = state.posts.map(post => {
        if (post.id === action.payload.id) {
          post.voteScore = action.payload.voteScore;
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts
      };
    default:
      return state;
  }
}

function comments(state = {}, action) {
  console.log('in comments type:' + action.type)
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, comments: action.comments };
    case VOTE_COMMENT:
      const updatedComments = state.comments.map(item => {
        if (item.id === action.commentId.id) {
          item.voteScore = action.commentId.voteScore;
        }
        return item;
      });
      return {
        ...state,
        comments: updatedComments
      };
    case DELETE_COMMENT:
      const availableComments = state.comments.filter(
        item => item.id !== action.commentId
      );
      return {
        ...state,
        comments: availableComments
      };
    case ADD_COMMENT:
      return { ...state, comments: state.comments.concat(action.comment) };
    case EDIT_COMMENT:
      return { ...state, ...action.comment };
    default:
      return state;
  }
}

function sort(state = { sort: "timestamp" }, action) {
  switch (action.type) {
    case CHANGE_SORT:
       return {
        ...state,
        sort: action.value
      };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  sort
});
