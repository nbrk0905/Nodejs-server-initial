const http = require('http');
const fs = require('fs');
const path = require('path');

// Helper function to serve files
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

// Create server
const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my Server');
  } else if (url === '/text') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is a text response from the server.');
  } else if (url === '/html') {
    serveFile(res, path.join(__dirname, 'index.html'), 'text/html');
  } else if (url === '/image') {
    serveFile(res, path.join(__dirname, 'media/image.jpg'), 'image/jpeg');
  } else if (url === '/audio') {
    serveFile(res, path.join(__dirname, 'media/audio.mp3'), 'audio/mpeg');
  } else if (url === '/video') {
    serveFile(res, path.join(__dirname, 'media/video.mp4'), 'video/mp4');
  } else if (url === '/pdf') {
    serveFile(res, path.join(__dirname, 'docs/sample.pdf'), 'application/pdf');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
