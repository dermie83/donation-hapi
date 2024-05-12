import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const groupApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const groups = await db.groupStore.find();
      return h.response(groups).code(200);
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const group = await db.groupStore.findOne(request.params.id);
        if (group === null) {
          return Boom.notFound("No Group with this id");
        }
        return h.response(group).code(200);
      } catch (err) {
        return Boom.notFound("No Group with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const group = await db.groupStore.add(request.payload);
      if (group !== null) {
        return h.response(group).code(201);
      }
      return Boom.badImplementation("error creating group");
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      await db.groupStore.delete();
      return h.response().code(204);
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      await db.groupStore.deleteOne(request.params.id);
      return h.response().code(204);
    },
  },
};