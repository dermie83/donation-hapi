import { Lighthouse } from "../../types/lighthouse-types.js";
import { LighthouseMongoose } from "./lighthouse.js";

export const lighthouseStore = {
  async find(): Promise<Lighthouse[]> {
    const lighthouses = await LighthouseMongoose.find().populate("user").populate("group").lean();
    console.log("lighthouses ", lighthouses);
    // lighthouses.forEach((lighthouse) => {
    //   // @ts-ignore
    //   lighthouse.user = `${lighthouse.user} ${lighthouse.user}`;
    // });
    return lighthouses;
  },

  async findBy(id: string): Promise<Lighthouse | null> {
    const lighthouse = await LighthouseMongoose.findOne({ group: id });
    if (!lighthouse) {
      return null;
    }
    return lighthouse;
  },

  async add(lighthouse: Lighthouse): Promise<Lighthouse | null> {
    let newLighthouse = new LighthouseMongoose({ ...lighthouse });
    await newLighthouse.save();
    return newLighthouse;
  },

  async delete() {
    await LighthouseMongoose.deleteMany({});
  },


  async updateLighthouse(updatedLighthouse:Lighthouse) {
    const lighthouseDoc = await LighthouseMongoose.findOne({ id: updatedLighthouse });

    lighthouseDoc.name = updatedLighthouse.name;
    lighthouseDoc.user = updatedLighthouse.user;
    lighthouseDoc.group = updatedLighthouse.group;
    lighthouseDoc.lat = updatedLighthouse.lat;
    lighthouseDoc.lng = updatedLighthouse.lng;
    lighthouseDoc.img = updatedLighthouse.img;
    
    await lighthouseDoc.save();
  },

};