import express from "express";
import Student from "../models/Student.model";

/* GET students listing. */
const router = express.Router();
router.get("/", (req, res, next) => {
  Student.find()
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/add/:id", (req, res, next) => {
  const rodCislo = req.body.rodCislo;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const address = req.body.address;
  const email = req.body.email;
  const libka = req.params.id;

  const newStudent = new Student({
    rodCislo,
    name,
    lastname,
    address,
    email,
    librariesAccess: [libka],
  });

  newStudent
    .save()
    .then(() =>
      res.status(200).json("STUDENT ADDED, his ID is: " + newStudent._id)
    )
    .catch((err) => res.status(400).json("ERROR " + err));
});

router.get("/getOne/:id", (req, res, next) => {
  const id = req.params.id;
  Student.findById(id)
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/updateStud", (req, res, next) => {
  const rodCislo = req.body.rodCislo;
  const id = req.body.id;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const address = req.body.address;
  const email = req.body.email;
  Student.findByIdAndUpdate(id, {
    rodCislo: rodCislo,
    name: name,
    lastname: lastname,
    address: address,
    email: email,
  })
    .then(() => res.status(200).json("EDITED"))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.get("/getStudOfLib/:id", (req, res, next) => {
  const id = req.params.id;

  Student.find({ librariesAccess: id })
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.get("/getStudOutOfLib/:id", (req, res, next) => {
  const id = req.params.id;
  Student.find({ librariesAccess: { $ne: id } })
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/removeFromLib/:id/:idStud", (req, res, next) => {
  const idLibrary = req.params.id;
  const idStud = req.params.idStud;

  Student.findByIdAndUpdate(idStud, { $pull: { librariesAccess: idLibrary } })
    .then(() => res.status(200).json("DONE!"))
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/addToLib/:id/:idStud", (req, res, next) => {
  const idLibrary = req.params.id;
  const idStud = req.params.idStud;
  Student.findByIdAndUpdate(idStud, { $push: { librariesAccess: idLibrary } })
    .then(() => res.status(200).json("DONE!"))
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/libDeleted/:id", (req, res, next) => {
  const idLibrary = req.params.id;
  Student.updateMany(
    { librariesAccess: [idLibrary] },
    { $pull: { librariesAccess: idLibrary } }
  )
    .then(() => res.status(200).json("DONE!"))
    .catch((err) => res.status(400).json("ERROR: ", err));
});

router.post("/studInLib/:id/:rodCislo", (req, res, next) => {
  const id = req.params.id;
  const rodCislo = req.params.rodCislo;

  Student.find({ rodCislo: rodCislo, librariesAccess: id })
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(400).json(false));
});

export default router;
