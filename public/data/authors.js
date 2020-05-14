const getAuthors = () => {
  return fetch('/api/authors').then(response => response.json());
};
const getAuthorById = _id => {
  return fetch(`/api/authors/${_id}`).then(response => response.json());
};
