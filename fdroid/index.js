const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

// Tell Express that files ending in .html should be rendered with EJS's renderFile
app.engine('html', ejs.renderFile);

app.use('/fdroidrepo/repo', express.static('/fdroid/repo'));
// Set the default view engine to .html so you can omit the extension in res.render()
app.set('view engine', 'html');

// Tell Express where your HTML templates live
app.set('views', path.join(__dirname, 'fdroidrepo/repo'));

// Render the HTML from a route
app.get('/fdroid', (req, res) => {
    // Because we set the view engine to "html", we can just pass the name without the extension
    res.render('index');   // Express will look for views/index.html
});

// Start the server
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
}

module.exports = app;
