import { mongoose } from "mongoose";
import express from "express";
import studentsRouter from "./routes/students";
import libraryRouter from "./routes/libraries";
import booksRouter from "./routes/books";
import cors from "cors";
import { url } from "./env";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("database connected");
});

const app = express();
app.set("view engine", "html");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/students", studentsRouter);
app.use("/libraries", libraryRouter);
app.use("/books", booksRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send("ERROR: ", err.message);
});

app.listen(5000, () => console.log("Server runs on port 5000"));

export default app;
