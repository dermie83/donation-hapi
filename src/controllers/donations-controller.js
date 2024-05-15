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
    deleteDonation: {
        handler: async function (request, h) {
          // const donation = await db.donationStore.getDonationById(request.params.id);
          await db.donationStore.deleteDonation(request.params.id);
          return h.redirect("/report");
        },
      },
      editDonation: {
        handler: async function (request, h) {
          const donation = await db.donationStore.getDonationById(request.params.id);
          console.log("donationID", donation._id)
          const lighthouse = await db.lighthouseStore.find(request.params.lighthouseid);
          // console.log("lighthouseID", lighthouse)
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
        handler: async function (request, h) {
          const donation = await db.donationStore.getDonationById(request.params.id);
          console.log("donationID", donation)
          const donationPayload = request.payload;
          
          const newDonation = {
            amount: donationPayload.amount,
            // towerHeight: lighthousePayload.towerHeight,
            // lightHeight: lighthousePayload.lightHeight,
            // character: lighthousePayload.character,
            // daymark: lighthousePayload.daymark,
            // range: lighthousePayload.range,
            // latitude: lighthousePayload.latitude,
            // longitude: lighthousePayload.longitude,
            // image: lighthousePayload.image,
          };
          await db.donationStore.updateDonation(donation, newDonation);
          return h.redirect(`/report/${donation._id}`);
        },
      },
};
