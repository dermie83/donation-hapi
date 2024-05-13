import { userApi } from "./api/users-api.js";
import { lighthousesApi } from "./api/lighthouses-api.js";
import { donationsApi } from "./api/donations-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

    { method: "GET", path: "/api/lighthouses", config: lighthousesApi.find },
    { method: "GET", path: "/api/lighthouses/{id}", config: lighthousesApi.findOne },
    { method: "POST", path: "/api/lighthouses", config: lighthousesApi.create },
    { method: "DELETE", path: "/api/lighthouses/{id}", config: lighthousesApi.deleteOne },
    { method: "DELETE", path: "/api/lighthouses", config: lighthousesApi.deleteAll },

    { method: "GET", path: "/api/donations", config: donationsApi.findAll },
    { method: "GET", path: "/api/lighthouses/{id}/donations", config: donationsApi.findByLighthouse },
    { method: "POST", path: "/api/lighthouses/{id}/donations", config: donationsApi.makeDonation },
    { method: "DELETE", path: "/api/donations", config: donationsApi.deleteAll },
];
