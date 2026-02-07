const db = require("../db");

const seedDatabase = () => {
  db.serialize(() => {

    db.run(`
      CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        bank_account TEXT,
        ifsc TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY,
        title TEXT,
        author_id INTEGER,
        royalty_per_sale INTEGER
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER,
        quantity INTEGER,
        sale_date TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS withdrawals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author_id INTEGER,
        amount INTEGER,
        status TEXT,
        created_at TEXT
      )
    `);

    db.run(`
      INSERT OR IGNORE INTO authors VALUES
      (1,'Priya Sharma','priya@email.com','1234567890','HDFC0001234'),
      (2,'Rahul Verma','rahul@email.com','0987654321','ICIC0005678'),
      (3,'Anita Desai','anita@email.com','5678901234','SBIN0009012')
    `);

    db.run(`
      INSERT OR IGNORE INTO books VALUES
      (1,'The Silent River',1,45),
      (2,'Midnight in Mumbai',1,60),
      (3,'Code & Coffee',2,75),
      (4,'Startup Diaries',2,50),
      (5,'Poetry of Pain',2,30),
      (6,'Garden of Words',3,40)
    `);

    db.get(`SELECT COUNT(*) AS count FROM sales`, (err, row) => {
      if (row.count === 0) {
        db.run(`
          INSERT INTO sales (book_id, quantity, sale_date) VALUES
          (1,25,'2025-01-05'),
          (1,40,'2025-01-12'),
          (2,15,'2025-01-08'),
          (3,60,'2025-01-03'),
          (3,45,'2025-01-15'),
          (4,30,'2025-01-10'),
          (5,20,'2025-01-18'),
          (6,10,'2025-01-20')
        `);
      }
    });

  });
};

module.exports = seedDatabase;
