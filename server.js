
import express from 'express';

const app = express();

app.get('/', (req, res) => res.sendFile(rel('./index.html')));

app.get('/regular', (req, res) => {
  res.contentType('text/html');
  res.send(green('regular: OK'));
});

app.get('/header', (req, res) => {
  res.contentType('text/html');
  res.setHeader('Server-Timing', 'cid;desc="bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi";dur=00.11');
  res.send(green('header: OK'));
});

app.get('/trailer', (req, res) => {
  res.contentType('text/html');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Trailer', 'Server-Timing');
  res.write(green('trailer: OK'));
  res.addTrailers({ 'Server-Timing': 'cid;desc="bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi";dur=42.42'});
  res.end();
});

// use the wtf cat CID as trailer

// response.writeHead(200, { 'Content-Type': 'text/plain',
//                           'Trailer': 'Content-MD5' });
// response.write(fileData);
// response.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
// response.end();

app.listen(1337, () => console.warn(`Up at http://localhost:1337/.`));

function green (label) {
  return `<!doctype html><p style="color: green; font-weight: bold">${label}\n\n`;
}

function rel (pth) {
  return decodeURIComponent(new URL(pth, import.meta.url).toString().replace(/^file:\/\//, ''));
}
