const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
const root = '/Users/ankit/Documents/Projects/chokhi';
const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml' };
const url = require('url');
http.createServer((req, res) => {
  const pathname = decodeURIComponent(url.parse(req.url).pathname);
  let filePath = path.join(root, pathname === '/' ? 'index.html' : pathname);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'text/plain' });
    res.end(data);
  });
}).listen(port, () => console.log('Serving on port ' + port));
