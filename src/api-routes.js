import { userApi } from "./api/users-api.js";
import { groupApi } from "./api/group-api.js";
import { lighthouseApi } from "./api/lighthouse-api.js";
export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
    { method: "GET", path: "/api/groups", config: groupApi.find },
    { method: "GET", path: "/api/groups/{id}", config: groupApi.findOne },
    { method: "POST", path: "/api/groups", config: groupApi.create },
    { method: "DELETE", path: "/api/groups/{id}", config: groupApi.deleteOne },
    { method: "DELETE", path: "/api/groups", config: groupApi.deleteAll },
    { method: "GET", path: "/api/lighthouses", config: lighthouseApi.findAll },
    { method: "GET", path: "/api/groups/{id}/lighthouses", config: lighthouseApi.findByGroup },
    { method: "POST", path: "/api/groups/{id}/lighthouses", config: lighthouseApi.addLighthouse },
    { method: "DELETE", path: "/api/lighthouses", config: lighthouseApi.deleteAll },
];
