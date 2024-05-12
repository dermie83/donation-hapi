import { userApi } from "./api/users-api.js";
import { groupApi } from "./api/group-api.js";
import { lighthouseApi } from "./api/lighthouse-api.js";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET" as const, path: "/api/groups", config: groupApi.find },
  { method: "GET" as const, path: "/api/groups/{id}", config: groupApi.findOne },
  { method: "POST" as const, path: "/api/groups", config: groupApi.create },
  { method: "DELETE" as const, path: "/api/groups/{id}", config: groupApi.deleteOne },
  { method: "DELETE" as const, path: "/api/groups", config: groupApi.deleteAll },

  { method: "GET" as const, path: "/api/lighthouses", config: lighthouseApi.findAll },
  { method: "GET" as const, path: "/api/groups/{id}/lighthouses", config: lighthouseApi.findByGroup },
  { method: "POST" as const, path: "/api/groups/{id}/lighthouses", config: lighthouseApi.addLighthouse },
  { method: "DELETE" as const, path: "/api/lighthouses", config: lighthouseApi.deleteAll },
];