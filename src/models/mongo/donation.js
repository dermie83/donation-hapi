import { Schema, model } from "mongoose";

const donationSchema = new Schema({
    amount: Number,
    method: String,
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    lighthouse: {
        type: Schema.Types.ObjectId,
        ref: "Lighthouse",
    },
    lat: String,
    lng: String,
});
export const DonationMongoose = model("Donation", donationSchema);
