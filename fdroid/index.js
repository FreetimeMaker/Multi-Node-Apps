const express = require('express');
const path = require('path');
const app = express();

// Absolute Pfadbestimmung (kompatibel mit Serverless/Vercel)
const repoPath = path.join(__dirname, 'fdroidrepo', 'repo');

// Statische Dateien direkt auf der Wurzel des Sub-Services anbieten
app.use(express.static(repoPath));

// Falls explizit /repo im Pfad mit übergeben wird
app.use('/repo', express.static(repoPath));

// Fallback für index.html auf der Startseite des Dienstes
app.get('/', (req, res) => {
    res.sendFile(path.join(repoPath, 'index.html'));
});

module.exports = app;