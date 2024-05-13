import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const donationsApi = {
    findAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const donations = await db.donationStore.find();
                return h.response(donations).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    findByLighthouse: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const donations = (await db.donationStore.findBy(request.params.id));
            return h.response(donations).code(200);
        },
    },
    makeDonation: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const lighthouse = (await db.lighthouseStore.findOne(request.params.id));
            if (lighthouse === null) {
                return Boom.notFound("No lighthouse with this id");
            }
            const donationPayload = request.payload;
            const donation = {
                amount: donationPayload.amount,
                method: donationPayload.method,
                donor: request.auth.credentials._id,
                lighthouse: lighthouse,
                lat: donationPayload.lat,
                lng: donationPayload.lng,
            };
            const newDonation = (await db.donationStore.add(donation));
            return h.response(newDonation).code(200);
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            console.log("delete...");
            await db.donationStore.delete();
            return h.response().code(204);
        },
    },
};
