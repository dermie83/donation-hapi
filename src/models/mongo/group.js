import { Schema, model } from "mongoose";
const groupSchema = new Schema({
    name: String,
});
export const GroupMongoose = model("Group", groupSchema);
