import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Lighthouse, Donation } from "../types/donation-types.js";

export const donationsApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const donations = await db.donationStore.find();
        return h.response(donations).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByLighthouse: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const donations = (await db.donationStore.findBy(request.params.id)) as Donation;
      return h.response(donations).code(200);
    },
  },

  makeDonation: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const lighthouse = (await db.lighthouseStore.findOne(request.params.id)) as Lighthouse;
      if (lighthouse === null) {
        return Boom.notFound("No Candidate with this id");
      }
      const donationPayload = request.payload as Donation;
      const donation = {
        amount: donationPayload.amount,
        method: donationPayload.method,
        donor: request.auth.credentials._id,
        lighthouse: lighthouse,
        lat: donationPayload.lat,
        lng: donationPayload.lng,
      };
      const newDonation = (await db.donationStore.add(donation)) as Donation;
      return h.response(newDonation).code(200);
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      console.log("delete...");
      await db.donationStore.delete();
      return h.response().code(204);
    },
  },
};