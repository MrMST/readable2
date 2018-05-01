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

export const getCommentsForPost = postId =>
fetch(`${API}/posts/${postId}/comments`, { headers: { Authorization: "whatever-you-want" } }).then(response =>
  response.json().then(data => data)
);

export const postVote = (postId, option) =>
  fetch(`${API}/posts/${postId}`, {
    method: `POST`,
    headers: {
      Authorization: "whatever-you-want",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());