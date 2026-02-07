const db = require("../db");

exports.getAllAuthors = (cb) => {
  db.all(`
    SELECT a.id, a.name,
    IFNULL(SUM(s.quantity * b.royalty_per_sale),0) AS total_earnings
    FROM authors a
    LEFT JOIN books b ON a.id = b.author_id
    LEFT JOIN sales s ON b.id = s.book_id
    GROUP BY a.id
  `, cb);
};

exports.getAuthorById = (id, cb) => {
  db.get(`SELECT * FROM authors WHERE id = ?`, [id], cb);
};
