const db = require("../db");

exports.getBooksByAuthor = (authorId, cb) => {
  db.all(`
    SELECT b.id, b.title, b.royalty_per_sale,
    IFNULL(SUM(s.quantity),0) AS total_sold,
    IFNULL(SUM(s.quantity * b.royalty_per_sale),0) AS total_royalty
    FROM books b
    LEFT JOIN sales s ON b.id = s.book_id
    WHERE b.author_id = ?
    GROUP BY b.id
  `, [authorId], cb);
};
