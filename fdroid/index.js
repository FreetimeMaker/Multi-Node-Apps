const express = require('express');
const path = require('path');
const app = express();

// process.cwd() garantiert in Serverless-Umgebungen den Zugriff vom Projektstamm
const repoPath = path.join(process.cwd(), 'fdroid', 'fdroidrepo', 'repo');

// Relativer Fallback falls lokal ausgeführt
const localRepoPath = path.join(__dirname, 'fdroidrepo', 'repo');
const finalPath = require('fs').existsSync(repoPath) ? repoPath : localRepoPath;

// Serve Dateien sowohl auf Root als auch auf /fdroid und /repo
app.use('/', express.static(finalPath));
app.use('/fdroid', express.static(finalPath));
app.use('/repo', express.static(finalPath));
app.use('/fdroid/repo', express.static(finalPath));

// Explizite Handhabung für HTML-Aufrufe
app.get(['/', '/fdroid', '/fdroid/'], (req, res) => {
    res.sendFile(path.join(finalPath, 'index.html'));
});

module.exports = app;