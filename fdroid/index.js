// fdroid/index.js
const express = require('express');
const path = require('path');
const app = express();

const repoPath = path.join(__dirname, 'fdroidrepo', 'repo');

app.use('/', express.static(repoPath));
app.use('/repo', express.static(repoPath));

module.exports = app;