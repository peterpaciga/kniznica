import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    idLibrary: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    history: [
      {
        _id: false,
        idStud: {
          type: String,
          required: true,
        },
        date_burrow: {
          type: String,
          required: true,
        },
        last_date_to_return: {
          type: String,
          required: true,
        },
        date_return: {
          type: String,
          default: "notReturned",
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
