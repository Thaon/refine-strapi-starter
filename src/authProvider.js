import { AuthHelper } from "@pankod/refine-strapi-v4";

import { TOKEN_KEY, API_URL } from "./constants";

import axios from "utils/axios";

const strapiAuthHelper = AuthHelper(API_URL + "/api");

export const authProvider = {
  register: async ({ username, email, password }) => {
    const { data, status } = await axios.post("/api/auth/local/register", {
      username,
      email,
      password,
    });
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      // set header axios instance
      axios.defaults.headers.common.Authorization = `Bearer ${data.jwt}`;
      return Promise.resolve();
    }
    return Promise.reject();
  },
  login: async ({ username, password }) => {
    const { data, status } = await strapiAuthHelper.login(username, password);
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);
      // set header axios instance
      axios.defaults.headers.common = {
        Authorization: `Bearer ${data.jwt}`,
      };
      return Promise.resolve();
    }
    return Promise.reject();
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }

    const { data, status } = await strapiAuthHelper.me(token);
    if (status === 200) {
      const { id, username, email } = data;
      return Promise.resolve({
        id,
        username,
        email,
      });
    }

    return Promise.reject();
  },
};
