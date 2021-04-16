const express = require("express");
const cors = require("cors");
const newsRouter = require("./routes/newsRoute");
const PORT = 8000;
const app = express();

// middleware which allows everyone to fetch data from our API
app.use(cors());

//  express.json() or body-parser (this way our API can accept upcomming JSON data)
app.use(express.json());
app.use("/", newsRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`API running on port: ${PORT}`);
});
