import { Group } from "../../types/lighthouse-types.js";
import { GroupMongoose } from "./group.js";

export const groupStore = {
  async find(): Promise<Group[]> {
    const groups = await GroupMongoose.find().lean();
    return groups;
  },

  async findOne(id: string): Promise<Group | null> {
    const group = await GroupMongoose.findOne({ _id: id }).lean();
    return group;
  },

  async findBy(name: string): Promise<Group | null> {
    const group = await GroupMongoose.findOne({ name }).lean();
    return group;
  },
};