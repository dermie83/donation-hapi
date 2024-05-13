import { userApi } from "./api/users-api.js";
import { lighthousesApi } from "./api/lighthouses-api.js";
import { donationsApi } from "./api/donations-api.js";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET" as const, path: "/api/lighthouses", config: lighthousesApi.find },
  { method: "GET" as const, path: "/api/lighthouses/{id}", config: lighthousesApi.findOne },
  { method: "POST" as const, path: "/api/lighthouses", config: lighthousesApi.create },
  { method: "DELETE" as const, path: "/api/lighthouses/{id}", config: lighthousesApi.deleteOne },
  { method: "DELETE" as const, path: "/api/lighthouses", config: lighthousesApi.deleteAll },

  { method: "GET" as const, path: "/api/donations", config: donationsApi.findAll },
  { method: "GET" as const, path: "/api/lighthouses/{id}/donations", config: donationsApi.findByLighthouse },
  { method: "POST" as const, path: "/api/lighthouses/{id}/donations", config: donationsApi.makeDonation },
  { method: "DELETE" as const, path: "/api/donations", config: donationsApi.deleteAll },
];