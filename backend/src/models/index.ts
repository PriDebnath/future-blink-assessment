import mongoose from "mongoose";
import { Schema} from "mongoose";

const schema =  new Schema({
  prompt: String,
  response: String,
  created_at: Number,
  modified_at: Number,
});

// Creating model, it will generate a collection in database
const model = mongoose.model("flow", schema);

export { model }