const getArticles = () => {
  return fetch('/api/articles').then(response => response.json());
};
const getArticleById = _id => {
  return fetch(`/api/articles/${_id}`).then(response => response.json());
};
