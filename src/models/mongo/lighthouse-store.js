import { LighthouseMongoose } from "./lighthouse.js";

export const lighthouseStore = {
    async find() {
        const lighthouses = await LighthouseMongoose.find().lean();
        return lighthouses;
    },
    async findOne(id) {
        const lighthouse = await LighthouseMongoose.findOne({ _id: id }).lean();
        return lighthouse;
    },
    async findBy(lastName, firstName) {
        const lighthouse = await LighthouseMongoose.findOne({
            lastName,
            firstName,
        }).lean();
        return lighthouse;
    },
    async deleteLighthouse(id) {
        try {
          await LighthouseMongoose.deleteOne({ _id: id });
        } catch (error) {
          console.log("bad id");
        }
      },
};
