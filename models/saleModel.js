const db = require("../db");

exports.getSalesByAuthor = (authorId, cb) => {
  db.all(`
    SELECT b.title AS book_title,
    s.quantity,
    (s.quantity * b.royalty_per_sale) AS royalty_earned,
    s.sale_date
    FROM sales s
    JOIN books b ON s.book_id = b.id
    WHERE b.author_id = ?
    ORDER BY s.sale_date DESC
  `, [authorId], cb);
};
