const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// define the 1st route. app route
// accepts regex
// ^ starts with
// $ ends with
// (.html)? makes it optional
app.get('^/$|/index(.html)?', (req, res) => {
  // serve a file
  // res.sendFile('./views/index.html', { root: __dirname })
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

// redirect page
app.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html'); //302 by default
});

// route handlers

// function chain
app.get('/hello(.html)?', (req, res, next) => {
  console.log('attempted to serve hello.html')
  next();
}, (req, res) => {
  res.send('Hello World!');
});

// chaining route handlers
const one = (req, res, next) => {
  console.log('One')
  next();
};

const two = (req, res, next) => {
  console.log('Two')
  next();
};

const three = (req, res) => {
  console.log('Three')
  res.send('Finished');
};

// accepts an array of routes
app.get('/chain(.html)?', [one, two, three])

// custom 404 file
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
