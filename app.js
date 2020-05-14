const express = require('express');
const app = express();
const path = require('path');
const routes = require('./src/routes');
const utils = require('./src/utilities');

const run = async () => {
  await utils.seedData();

  app.use('/', express.static(path.join(__dirname, 'public')));

  app.use(express.json());
  app.use('/', routes);

  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });
};
run();
