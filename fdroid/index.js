const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// 1. Absoluten Pfad ohne führende Slashes in den Unterordnern definieren
const repoPath = path.join(__dirname, 'fdroid', 'fdroidrepo', 'repo');
app.set('views', repoPath);

// 2. Statische Auslieferung für /fdroid VOR allen GET-Routen platzieren
// Route auf /fdroid/repo ändern
app.use('/fdroid/repo', express.static(repoPath));

// 3. Fallback: Falls jemand im Browser /fdroid aufruft und Express die index.html aus repoPath rendern soll
app.get('/fdroid', (req, res) => {
    res.render('index');
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
}

module.exports = app;