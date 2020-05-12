const fetch = require('node-fetch');

const getEndpoints = async endpoint => {
  let response = await fetch(
    `https://igorfullstack.herokuapp.com/api/${endpoint}`
  );
  let data = await response.json();
  return data;
};

// module.exports = getEndpoints;
//  console.log(articles);
