const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

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

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my Server');
  } else if (req.url === '/text') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is a text response from the server.');
  } else if (req.url === '/html') {
    serveFile(res, path.join(__dirname, 'index.html'), 'text/html');
  } else if (req.url === '/image') {
    serveFile(res, path.join(__dirname, 'media/image.jpg'), 'image/jpeg');
  } else if (req.url === '/audio') {
    serveFile(res, path.join(__dirname, 'media/audio.mp3'), 'audio/mpeg');
  } else if (req.url === '/video') {
    serveFile(res, path.join(__dirname, 'media/video.mp4'), 'video/mp4');
  } else if (req.url === '/pdf') {
    serveFile(res, path.join(__dirname, 'docs/sample.pdf'), 'application/pdf');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
