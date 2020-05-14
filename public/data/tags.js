const getTags = () => {
  return fetch('/api/tags').then(response => response.json());
};
