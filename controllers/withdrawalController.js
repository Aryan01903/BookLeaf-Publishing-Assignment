const db = require("../db");
const Withdrawal = require("../models/withdrawalModel");

exports.createWithdrawal = (req, res) => {
  const { author_id, amount } = req.body;

  if (amount < 500) {
    return res.status(400).json({ error: "Minimum withdrawal is ₹500" });
  }

  db.get(
    `SELECT id FROM authors WHERE id = ?`,
    [author_id],
    (err, author) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }

      db.get(
        `
        SELECT 
          IFNULL(SUM(s.quantity * b.royalty_per_sale), 0) -
          IFNULL((SELECT SUM(amount) FROM withdrawals WHERE author_id = ?), 0)
          AS balance
        FROM books b
        LEFT JOIN sales s ON b.id = s.book_id
        WHERE b.author_id = ?
        `,
        [author_id, author_id],
        (err, row) => {
          if (err) return res.status(500).json({ error: "Database error" });

          if (amount > row.balance) {
            return res.status(400).json({ error: "Insufficient balance" });
          }

          Withdrawal.createWithdrawal(author_id, amount, () => {
            res.status(201).json({
              author_id,
              amount,
              status: "pending",
              new_balance: row.balance - amount
            });
          });
        }
      );
    }
  );
};

