import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Application from './Application';

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <title>React Gateway Universal Example</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div id="root">${ReactDOMServer.renderToString(<Application/>)}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

app.get('/bundle.js', (req, res) => res.sendFile(path.join(__dirname, 'bundle.js')));
app.get('/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'styles.css')));

app.listen(3000);
console.log('>> http://localhost:3000/');
