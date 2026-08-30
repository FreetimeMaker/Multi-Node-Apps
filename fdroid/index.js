const express = require('express');
const path = require('path');

const app = express();

// Pfad zum Repo-Ordner
const repoPath = path.join(__dirname, 'fdroidrepo', 'repo');

// Statische Auslieferung – Express macht den Redirect auf /fdroid/ automatisch!
app.use('/fdroid', express.static(repoPath));
app.use('/fdroid/repo', express.static(repoPath));

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
}

module.exports = app;