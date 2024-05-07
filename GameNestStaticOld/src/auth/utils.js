import Response from "../models/api/Response";

export const getTextAsync = async (url, options) => {
    const res = await fetch(url, options)
        .then((r) => r)
        .catch((e) => {
            throw new Error(`Failed to fetch ${url}: ${e}`);
        });
    const data = res.ok ? await res.text().then((d) => d) : undefined;
    return new Response(data, res.statusText);
};

export const getJsonAsync = async (url, options) => {
    const res = await fetch(url, options)
        .then((r) => r)
        .catch((e) => {
            throw new Error(`Failed to fetch ${url}: ${e}`);
        });
    const data = res.ok ? await res.json().then((d) => d) : undefined;
    return new Response(data, res.statusText);
};

export const getClassAsync = async (url, options) => {
    const res = await getJsonAsync(url, options);
    return res;
};
