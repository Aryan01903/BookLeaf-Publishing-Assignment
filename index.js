const express = require("express");
const cors = require("cors");
const seedDatabase = require("./config/seed");
const authorRoutes = require("./routes/authorRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/test", (req, res) => {
  res.send("API is working !!!");
});

app.use("/authors", authorRoutes);
app.use("/withdrawals", withdrawalRoutes);

app.listen(process.env.PORT, () => {
  (console.log("Server running on port ", process.env.PORT), seedDatabase());
});
