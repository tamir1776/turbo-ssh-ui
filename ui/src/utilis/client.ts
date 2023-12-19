import axios from "axios";



export const apiClient = axios.create({
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
    }
});

export const setAccessToken = (accessToken: String) => {
    apiClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
};



