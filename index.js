const cors = require('cors');
const express = require('express');
const { getAllBooks, getBookById } = require('./controllers');

const app = express();
app.use(cors());
app.use(express.json());

//Endpoint1
app.get('/books', async (req, res) => {
  const books = getAllBooks();
  res.json({ books });
});

//Endpoint2
app.get('/books/details/:id', async (req, res) => {
  let book = getBookById(parseInt(req.params.id));
  res.json({ book });
});

module.exports = { app };
