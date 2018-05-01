import { combineReducers } from "redux";
import {
  RECEIVE_POSTS,
  ADD_POST,
  VOTE,
  CHANGE_SORT
} from "../actions";

function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...state, posts: action.posts };
    case ADD_POST:
      return {
        ...state,
        ...action.post
      };
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
  sort
});
