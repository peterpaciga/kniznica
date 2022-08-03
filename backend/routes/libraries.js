import express from "express";
import Library from "../models/Library.model";

const router = express.Router();

/* GET users listing. */

router.get("/", (req, res, next) => {
  Library.find()
    .then((libraries) => {
      res.status(200).json(libraries);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/add", (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;

  const newLibrary = new Library({ name, address });

  newLibrary
    .save()
    .then(() => res.status(201).json({ id: newLibrary._id }))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.get("/getOne/:id", (req, res, next) => {
  const id = req.params.id;
  Library.findById(id)
    .then((library) => {
      res.status(200).json(library);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/update", (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  Library.findByIdAndUpdate(id, {
    name: name,
    address: address,
  })
    .then(() => res.status(200).json("EDITED"))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.post("/delete/:id", (req, res, next) => {
  const id = req.params.id;
  Library.findByIdAndDelete(id)
    .then(() => res.status(200).json("DELETED!"))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

export default router;
