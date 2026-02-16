import axios from "axios";

const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 50000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})

const responseBody = (response: any) => response.data;

const request = {
    get: (url: string, params?: any) =>
        instance
            .get(url, { params })
            .then(responseBody),

    post: (url: string, body?: any, params?: any) =>
        instance
            .post(url, body, { params })
            .then(responseBody),

    put: (url: string, body?: any, params?: any) =>
        instance
            .put(url, body, { params })
            .then(responseBody),

    delete: (url: string, body?: any, params?: any) =>
        instance
            .delete(url, { data: body, params })
            .then(responseBody),
};

export default request;