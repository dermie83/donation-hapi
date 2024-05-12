import { GroupMongoose } from "./group.js";
export const groupStore = {
    async find() {
        const groups = await GroupMongoose.find().lean();
        return groups;
    },
    async findOne(id) {
        const group = await GroupMongoose.findOne({ _id: id }).lean();
        return group;
    },
    async findBy(name) {
        const group = await GroupMongoose.findOne({ name }).lean();
        return group;
    },
};
