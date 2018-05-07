const API = "http://localhost:3001";

// const HEADERS = {
//   Accept: "application/json",
//   Authorization: "whatever-you-want",
//   "Content-Type": "application/json"
// };

export const getPosts = () =>
  fetch(`${API}/posts`, {
    headers: { Authorization: "whatever-you-want" }
  }).then(res => res.json());

export const addPost = post =>
fetch(`${API}/posts`, {
  method: "POST",
  headers: {
    Authorization: "whatever-you-want",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(post)
}).then(data => data.json());

export const deletePost = postId => {
  return fetch(`${API}/posts/${postId}`, {
    method: "DELETE",
    headers: { Authorization: "whatever-you-want" }
  }).then(res => res);
};

export const editPost = (post, postId) => {
  return fetch(`${API}/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: "whatever-you-want",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(data => data.json());
};

export const getSinglePost = postId =>
  fetch(`${API}/posts/${postId}`, {
    headers: { Authorization: "whatever-you-want" }
  }).then(res => res.json());

export const getSingleComment = commentId =>
  fetch(`${API}/comments/${commentId}`,{
    headers: { Authorization: "whatever-you-want" }
  }).then(res => res.json().then(data => data)
);

export const getComments = postId =>
fetch(`${API}/posts/${postId}/comments`, { headers: { Authorization: "whatever-you-want" } }).then(response =>
  response.json().then(data => data)
);
// export const getCommentsForPost = postId =>
// fetch(`${API}/posts/${postId}/comments`, { headers: { Authorization: "whatever-you-want" } }).then(response =>
//   response.json().then(data => data)
// );

export const postVote = (postId, option) =>
  fetch(`${API}/posts/${postId}`, {
    method: `POST`,
    headers: {
      Authorization: "whatever-you-want",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({option})
  }).then(res => res.json());

  export const addComment = comment => {
    const body = JSON.stringify(comment);

    return fetch(`${API}/comments/`, {
      method: "POST",
      headers: {
        Authorization: "whatever-you-want",
        "Content-Type": "application/json"
      },
      body
    }).then(response => response.json());
  };

  export const deleteComment = commentId => {
    return fetch(`${API}/comments/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: "whatever-you-want" }
    }).then(response => response.json());
  };

  export const editComment = (comment, commentId) => {
    return fetch(`${API}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        Authorization: "whatever-you-want",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    }).then(data => data.json());
  };

  export const voteComment = (commentId, option) => {
    return fetch(`${API}/comments/${commentId}`, {
      method: "POST",
      headers: {
        Authorization: "whatever-you-want",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        option: option
      })
    }).then(data => data.json());
  };
