import { Schema, model } from "mongoose";
import { Group } from "../../types/lighthouse-types";

const groupSchema = new Schema<Group>({
  name: String,
  
});

export const GroupMongoose = model("Group", groupSchema);