import { db } from "../models/db.js";

export const donationsController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const lighthouses = await db.lighthouseStore.find();
            return h.view("donate", {
                title: "Make a Donation",
                user: loggedInUser,
                lighthouses: lighthouses,
            });
        },
    },
    donate: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const donationPayload = request.payload;
                const donation = {
                    amount: donationPayload.amount,
                    method: donationPayload.method,
                    donor: loggedInUser._id,
                    lighthouse: donationPayload.lighthouse,
                    lat: donationPayload.lat,
                    lng: donationPayload.lng,
                };
                await db.donationStore.add(donation);
                return h.redirect("/donate");
            }
            catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        },
    },
    report: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const donations = await db.donationStore.find();
            return h.view("report", {
                title: "Report",
                user: loggedInUser,
                donations: donations,
            });
        },
    },
};
