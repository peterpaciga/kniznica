import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    rodCislo: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    librariesAccess: {
      type: [String],
    },
  },
  { versionKey: false }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
