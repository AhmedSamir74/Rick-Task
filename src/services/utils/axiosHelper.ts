//<ROOT>/shared/APIKit.js
import axios from 'axios';
export const baseURL = 'https://beta.api.happygp.net/api';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
    baseURL,
    timeout: 10000,
    validateStatus: function (status) {
        return status <= 350; // Reject only if the status code is greater than 350
    },
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token: string) => {
    APIKit.interceptors.request.use(function (config) {
        config.headers.Authorization = token;
        return config;
    });
};
export default APIKit;
