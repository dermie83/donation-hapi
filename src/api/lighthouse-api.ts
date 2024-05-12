import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Group, Lighthouse } from "../types/lighthouse-types.js";

export const lighthouseApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const lighthouses = await db.lighthouseStore.find();
        return h.response(lighthouses).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByGroup: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const lighthouses = (await db.lighthouseStore.findBy(request.params.id)) as Group;
      return h.response(lighthouses).code(200);
    },
  },

  addLighthouse: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const group = (await db.groupStore.findOne(request.params.id)) as Group;
      if (group === null) {
        return Boom.notFound("No Group with this id");
      }
      const lighthousePayload = request.payload as Lighthouse;
      const lighthouse = {
        name: lighthousePayload.name,
        user: request.auth.credentials._id,
        group: group,
        lat: lighthousePayload.lat,
        lng: lighthousePayload.lng,
        img: lighthousePayload.img,
      };
      const newLighthouse = (await db.lighthouseStore.add(lighthouse)) as Lighthouse;
      return h.response(newLighthouse).code(200);
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      console.log("delete...");
      await db.lighthouseStore.delete();
      return h.response().code(204);
    },
  },
};