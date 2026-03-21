import mongoose from "mongoose";

const schema = mongoose.Schema({
  prompt: String,
  response: String,
  created_at: Number,
  modified_at: Number,
});

// Creating model, it will generate a collection in database
const model = mongoose.model("flow", schema);

export { model }