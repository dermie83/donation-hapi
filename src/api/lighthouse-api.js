import Boom from "@hapi/boom";
import { db } from "../models/db.js";
export const lighthouseApi = {
    findAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const lighthouses = await db.lighthouseStore.find();
                return h.response(lighthouses).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    findByGroup: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const lighthouses = (await db.lighthouseStore.findBy(request.params.id));
            return h.response(lighthouses).code(200);
        },
    },
    addLighthouse: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const group = (await db.groupStore.findOne(request.params.id));
            if (group === null) {
                return Boom.notFound("No Group with this id");
            }
            const lighthousePayload = request.payload;
            const lighthouse = {
                name: lighthousePayload.name,
                user: request.auth.credentials._id,
                group: group,
                lat: lighthousePayload.lat,
                lng: lighthousePayload.lng,
                img: lighthousePayload.img,
            };
            const newLighthouse = (await db.lighthouseStore.add(lighthouse));
            return h.response(newLighthouse).code(200);
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            console.log("delete...");
            await db.lighthouseStore.delete();
            return h.response().code(204);
        },
    },
};
