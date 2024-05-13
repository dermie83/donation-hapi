import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const lighthousesApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const lighthouses = await db.lighthouseStore.find();
            return h.response(lighthouses).code(200);
        },
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const lighthouse = await db.lighthouseStore.findOne(request.params.id);
                if (lighthouse === null) {
                    return Boom.notFound("No lighthouse with this id");
                }
                return h.response(lighthouse).code(200);
            }
            catch (err) {
                return Boom.notFound("No lighthouse with this id");
            }
        },
    },
    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const lighthouse = await db.lighthouseStore.add(request.payload);
            if (lighthouse !== null) {
                return h.response(lighthouse).code(201);
            }
            return Boom.badImplementation("error creating lighthouse");
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await db.lighthouseStore.delete();
            return h.response().code(204);
        },
    },
    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await db.lighthouseStore.deleteOne(request.params.id);
            return h.response().code(204);
        },
    },
};
