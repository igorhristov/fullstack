// const getComments = () => Promise.resolve(data.comments);
// const getCommentById = _id => {
//     return Promise.resolve(data.comments.find(({ id }) => _id === id));
// }

const getCommentsByArticleId = articleId => {
  return fetch(`/api/comments/${articleId}`).then(response => response.json());
};

const getComments = () => {
  return fetch('/api/comments').then(response => response.json());
};
