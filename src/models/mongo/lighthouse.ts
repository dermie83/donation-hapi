import { Schema, model } from "mongoose";
import { Lighthouse } from "../../types/donation-types";

const lighthouseSchema = new Schema<Lighthouse>({
  firstName: String,
  lastName: String,
  office: String,
});

export const LighthouseMongoose = model("Lighthouse", lighthouseSchema);