import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const librarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Library = mongoose.model("Library", librarySchema);

export default Library;
