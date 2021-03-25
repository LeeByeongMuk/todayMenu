const express = require('express');
const app = express();
const api = require('./routes/index');

app.use('/api', api);

const port = 3001;
app.listen(port);
