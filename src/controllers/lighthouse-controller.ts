import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const lightouseController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const groups = await db.groupStore.find();
      return h.view("lighthouse", {
        title: "Input New Lighthouse",
        user: loggedInUser,
        groups: groups,
      });
    },
  },
  add: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        
        const loggedInUser = request.auth.credentials;
        
        const lighthousePayload = request.payload as any;
        const file = lighthousePayload.imagefile
        
        const lighthouse = {
          name: lighthousePayload.name,
          user: loggedInUser._id,
          group: lighthousePayload.group,
          lat: lighthousePayload.lat,
          lng: lighthousePayload.lng,
          img: file,
        };
        await db.lighthouseStore.add(lighthouse);


        return h.redirect("/lighthouse");
      } catch (err:any) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  report: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const lighthouses = await db.lighthouseStore.find();
      return h.view("report", {
        title: "Report",
        user: loggedInUser,
        lighthouses: lighthouses,
      });
    },
  },
  // uploadImage: {
  //   handler: async function (request:Request, h:ResponseToolkit) {
  //     try {
  //       const lighthouse = await db.lighthouseStore.findBy(request.params.id);
  //       const loggedInUser = request.auth.credentials;
  //       const lighthousePayload = request.payload as any;
  //       const imgPayload = request.payload as any;
  //       const file = imgPayload.imagefile;
  //       if (Object.keys(file).length > 0) {
  //         const url = await imageStore.uploadImage(file);
  //         lighthouse.img = url;
  //         await db.lighthouseStore.updateLighthouse(lighthouse);
  //       }
  //       return h.redirect(`/lighthouse`);
  //     } catch (err:any) {
  //       return h.redirect(`/lighthouse`);
  //     }
  //   },
  //   payload: {
  //     multipart: true,
  //     output: "data",
  //     maxBytes: 209715200,
  //     parse: true,
  //   },
  // },
};