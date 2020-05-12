const express = require('express');
const app = express();
const path = require('path');
const routes = require('./src/routes');
const logger = require('./middleware/logger');

app.use(logger);
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/', routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
