import { getClassAsync } from "./utils";

const getDataApiBaseUrlAsync = async () => {
    return process.env.REACT_APP_API_URL;
};

export const loginAsync = async (code) => {
    return getClassAsync(`${await getDataApiBaseUrlAsync()}/auth/github/callback?code=${code}`, {
        credentials: "include",
    });
};

export const checkLoginAsync = async () => {
    return getClassAsync(`${await getDataApiBaseUrlAsync()}/auth/check`, { credentials: "include" });
};

export const logoutAsync = async () => {
    return fetch(`${await getDataApiBaseUrlAsync()}/auth/logout`, { credentials: "include" });
};
