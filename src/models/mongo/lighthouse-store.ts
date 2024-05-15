import { Lighthouse } from "../../types/donation-types.js";
import { LighthouseMongoose } from "./lighthouse.js";

export const lighthouseStore = {
  async find(): Promise<Lighthouse[]> {
    const lighthouses = await LighthouseMongoose.find().lean();
    return lighthouses;
  },

  async findOne(id: string): Promise<Lighthouse | null> {
    const lighthouse = await LighthouseMongoose.findOne({ _id: id }).lean();
    return lighthouse;
  },


  async findBy(lastName: string, firstName: string): Promise<Lighthouse | null> {
    const lighthouse = await LighthouseMongoose.findOne({
      lastName,
      firstName,
    }).lean();
    return lighthouse;
  },

  async deleteLighthouse(id:string) {
    try {
      await LighthouseMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },
};