const db = require("../db");

exports.createWithdrawal = (authorId, amount, cb) => {
  db.run(`
    INSERT INTO withdrawals (author_id, amount, status, created_at)
    VALUES (?, ?, 'pending', datetime('now'))
  `, [authorId, amount], cb);
};

exports.getWithdrawalsByAuthor = (authorId, cb) => {
  db.all(`
    SELECT * FROM withdrawals
    WHERE author_id = ?
    ORDER BY created_at DESC
  `, [authorId], cb);
};
