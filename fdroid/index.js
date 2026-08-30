const express = require('express');
const path = require('path');
const app = express();

const repoPath = path.join(__dirname, 'fdroidrepo', 'repo');

// Statische Dateien direkt auf Wurzel-Ebene und unter /repo bereitstellen
app.use('/', express.static(repoPath));
app.use('/repo', express.static(repoPath));

// Fallback für die Startseite
app.get('/', (req, res) => {
    res.sendFile(path.join(repoPath, 'index.html'));
});

module.exports = app;