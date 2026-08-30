const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Absolute Pfadbestimmung für Vercel Serverless
const repoPath = path.join(process.cwd(), 'fdroid', 'fdroidrepo', 'repo');

// Statische Dateien für alle möglichen Routing-Varianten bereitstellen
app.use('/', express.static(repoPath));
app.use('/fdroid', express.static(repoPath));
app.use('/repo', express.static(repoPath));
app.use('/fdroid/repo', express.static(repoPath));

// Fallback für HTML-Aufrufe
app.get('*', (req, res) => {
  const indexPath = path.join(repoPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('F-Droid Repository index.html not found on server.');
  }
});

module.exports = app;