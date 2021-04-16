const express = require("express");
const mongodb = require("mongodb").MongoClient;

const MONGO_URI =
  "mongodb+srv://tanyo:Tanyo.0042134369@cluster0.ec0yt.gcp.mongodb.net/news?retryWrites=true&w=majority";

const newsRouter = express.Router();

newsRouter.get("/news", (req, res) => {
  try {
    mongodb.connect(MONGO_URI, { useUnifiedTopology: true }, (err, db) => {
      let newsDb = db.db("news");
      newsDb
        .collection("news")
        .find({})
        .sort({ date: -1 })
        .toArray((err, result) => {
          res.json(result);
        });
    });
  } catch {
    res.json({ msg: "Cannot connect to the Database news!" });
  }
});

// ascending order route
newsRouter.get("/news/ascending-order", (req, res) => {
  try {
    mongodb.connect(MONGO_URI, { useUnifiedTopology: true }, (err, db) => {
      let newsSorted = db.db("news");
      newsSorted
        .collection("news")
        .find({})
        .sort({ date: 1 })
        .toArray((err, result) => {
          res.json(result);
        });
    });
  } catch {
    res.json({ msg: "Error loading data!" });
  }
});

// filter route
newsRouter.get("/news/:title", (req, res) => {
  try {
    mongodb.connect(MONGO_URI, { useUnifiedTopology: true }, (err, db) => {
      let filteredNews = db.db("news");
      filteredNews
        .collection("news")
        .find({ title: req.params.title })
        .toArray((err, result) => {
          res.json(result);
        });
    });
  } catch {
    res.json({ msg: "Error !" });
  }
});

// Delete by title
newsRouter.delete("/news/:title", (req, res) => {
  try {
    mongodb.connect(MONGO_URI, { useUnifiedTopology: true }, (err, db) => {
      let newsDb = db.db("news");
      newsDb
        .collection("news")
        .deleteOne({ title: req.params.title }, (err, result) => {
          res.json({ msg: `${req.params.title} deleted!` });
        });
    });
  } catch {
    res.json({ msg: "cannot be deleted!" });
  }
});

newsRouter.post("/news", (req, res) => {
  let id = req.body.id;
  let date = new Date();
  let title = req.body.title;
  let desc = req.body.description;
  let text = req.body.text;
  let obj = { id: id, date: date, title: title, desc: desc, text: text };
  try {
    mongodb.connect(MONGO_URI, { useUnifiedTopology: true }, (err, db) => {
      let newsDb = db.db("news");
      newsDb.collection("news").insertOne(obj, (err, result) => {
        res.json(obj);
      });
    });
  } catch {
    res.json({ msg: "Cannot send data to the server!" });
  }
});

module.exports = newsRouter;
