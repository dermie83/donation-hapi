import { Schema, model } from "mongoose";
import { Lighthouse } from "../../types/lighthouse-types";

const lighthouseSchema = new Schema<Lighthouse>({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },
  lat: String,
  lng: String,
  img: String,
});

export const LighthouseMongoose = model("Lighthouse", lighthouseSchema);