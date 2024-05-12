import { connectMongo } from "./mongo/connect.js";
export const db = {
    userStore: null,
    groupStore: null,
    lighthouseStore: null,
};
export function connectDb(dbType) {
    switch (dbType) {
        case "mongo":
            connectMongo(db);
            break;
        default:
    }
}
