const getArticles = () => {
  return fetch('/api/articles').then(response => response.json());
};
