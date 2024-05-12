import { Schema, model } from "mongoose";
const lighthouseSchema = new Schema({
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
