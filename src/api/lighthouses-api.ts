import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const lighthousesApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const candidates = await db.lighthouseStore.find();
      return h.response(candidates).code(200);
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const lighthouse = await db.lighthouseStore.findOne(request.params.id);
        if (lighthouse === null) {
          return Boom.notFound("No Candidate with this id");
        }
        return h.response(lighthouse).code(200);
      } catch (err) {
        return Boom.notFound("No Candidate with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
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
    handler: async function (request: Request, h: ResponseToolkit) {
      await db.lighthouseStore.delete();
      return h.response().code(204);
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      await db.lighthouseStore.deleteOne(request.params.id);
      return h.response().code(204);
    },
  },
};