const Author = require("../models/authorModel");
const Book = require("../models/bookModel");
const Sale = require("../models/saleModel");

exports.getAuthors = (req, res) => {
  Author.getAllAuthors((err, rows) => {
    res.json(rows.map(a => ({
      id: a.id,
      name: a.name,
      total_earnings: a.total_earnings,
      current_balance: a.total_earnings
    })));
  });
};

exports.getAuthorDetails = (req, res) => {
  const id = req.params.id;

  Author.getAuthorById(id, (err, author) => {
    if (!author) return res.status(404).json({ error: "Author not found" });

    Book.getBooksByAuthor(id, (err, books) => {
      const total = books.reduce((s, b) => s + b.total_royalty, 0);

      res.json({
        id: author.id,
        name: author.name,
        email: author.email,
        total_books: books.length,
        total_earnings: total,
        current_balance: total,
        books
      });
    });
  });
};

exports.getAuthorSales = (req, res) => {
  Sale.getSalesByAuthor(req.params.id, (_, sales) => res.json(sales));
};
