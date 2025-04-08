const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the server
const server = http.createServer((req, res) => {
    // Get the requested URL path
    let filePath = './pages' + (req.url === '/' ? '/dashboard.html' : req.url + '.html');

    // Resolve the file path
    filePath = path.resolve(filePath);

    // Check if the requested file exists
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Handle 404 Error
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 - Page Not Found</h1>`);
        } else {
            // Serve the HTML content
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

// Server listens on port 3000
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
