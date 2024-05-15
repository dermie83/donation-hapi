import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { DonationMongoose } from "../models/mongo/donation.js";
import { Donation } from "../types/donation-types.js";

export const donationsController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
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
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const loggedInUser = request.auth.credentials;
        const donationPayload = request.payload as any;
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
      } catch (err:any) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  report: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const donations = await db.donationStore.find();
      return h.view("report", {
        title: "Report",
        user: loggedInUser,
        donations: donations,
      });
    },
  },
  deleteDonation: {
    handler: async function (request:Request, h:ResponseToolkit) {
      // const donation = await db.donationStore.getDonationById(request.params.id);
      await db.donationStore.deleteDonation(request.params.id);
      return h.redirect(`/report`);
    },
  },
  editDonation: {
    handler: async function (request:Request, h:ResponseToolkit) {
      const donation = await db.donationStore.getDonationById(request.params.id);
      console.log("donationID", donation._id)
      const lighthouse = await db.lighthouseStore.findOne(request.params.lighthouseid);
      console.log("lighthouseID", lighthouse)
      const viewData = {
        title: "Lighthouses",
        donation: donation,
        lighthouse: lighthouse,
      };
      console.log("viewdata",viewData)
      return h.view("edit-donation", viewData);
    },
  },
  updateDonation: {
    handler: async function (request:Request, h:ResponseToolkit) {
      const donation = await db.donationStore.getDonationById(request.params.id);
      console.log("donationID", donation)
      const donationPayload = request.payload as any;
      
      const newDonation = {
        amount: donationPayload.amount,
          method: donationPayload.method,
          lighthouse: donationPayload.lighthouse,
          lat: donationPayload.lat,
          lng: donationPayload.lng,
      };
      await db.donationStore.updateDonation(donation, newDonation);
      return h.redirect(`/report/${donation._id}`);
    },
  },

};