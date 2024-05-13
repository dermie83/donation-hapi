import { Schema, model } from "mongoose";

const lighthouseSchema = new Schema({
    firstName: String,
    lastName: String,
    office: String,
});
export const LighthouseMongoose = model("Lighthouse", lighthouseSchema);
