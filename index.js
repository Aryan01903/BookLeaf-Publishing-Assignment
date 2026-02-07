const express = require("express");
const cors = require("cors");
const seedDatabase = require("./config/seed");
const authorRoutes = require("./routes/authorRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Welcome to Author Royalty API");
});

app.use("/authors", authorRoutes);
app.use("/withdrawals", withdrawalRoutes);


app.listen(process.env.PORT, () => {
  (console.log("Server running on port ", process.env.PORT), seedDatabase());
});
