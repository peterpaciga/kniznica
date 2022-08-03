import express from "express";
import Book from "../models/Book.model";
import moment from "moment";
const router = express.Router();

/* GET users listing. */

router.get("/booksToLend/:id", (req, res, next) => {
  const id = req.params.id;
  Book.find({ available: true, idLibrary: id })
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.get("/getLendBooks/:idLibrary", (req, res, next) => {
  const idlibrary = req.params.idLibrary;
  Book.aggregate([
    {
      $match: {
        idLibrary: idlibrary,
      },
    },
    {
      $unwind: "$history",
    },
    {
      $match: {
        "history.date_return": "notReturned",
      },
    },
  ])
    .then((history) => {
      res.status(200).json(history);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/addBook/:idLibrary", (req, res, next) => {
  const id = req.params.idLibrary;
  const name = req.body.name;
  const author = req.body.author;

  const newBook = new Book({
    idLibrary: id,
    name,
    author,
  });

  newBook
    .save()
    .then(() => res.status(201).json("Added"))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.post("/lendBook/:id/:idStud", (req, res, next) => {
  const id = req.params.id;
  const idStud = req.params.idStud;
  console.log(idStud);
  const date_burrow = moment(new Date()).format("DD-MM-YYYY");
  const last_date_to_return = moment(new Date())
    .add(30, "days")
    .format("DD-MM-YYYY");
  Book.findByIdAndUpdate(id, {
    available: false,
    $push: {
      history: {
        idStud: idStud,
        date_burrow: date_burrow,
        last_date_to_return: last_date_to_return,
      },
    },
  })
    .then(() => res.status(200).json("DONE!"))
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/returnBook/:id/:idStud", (req, res, next) => {
  const id = req.params.id;
  const idStud = req.params.idStud;
  const date_burrow = moment(new Date()).format("DD-MM-YYYY");
  Book.findOneAndUpdate(
    {
      _id: id,
      history: {
        $elemMatch: {
          idStud: idStud,
          date_return: "notReturned",
        },
      },
    },
    {
      $set: { "history.$.date_return": date_burrow },
      available: true,
    }
  )
    .then(() => res.status(200).json("DONE!"))
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.get("/getStudHistory/:idStud", (req, res, next) => {
  const idStud = req.params.idStud;
  Book.aggregate([
    {
      $match: {
        "history.idStud": idStud,
      },
    },
    {
      $unwind: "$history",
    },
    {
      $match: {
        "history.idStud": idStud,
      },
    },
  ])
    .then((history) => {
      res.status(200).json(history);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/delete/:id", (req, res, next) => {
  const id = req.params.id;
  Book.findByIdAndUpdate(id, { idLibrary: "Fired" })
    .then(() => res.status(200).json("DELETED!"))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

export default router;
