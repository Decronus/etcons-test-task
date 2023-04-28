import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    timeout: 0,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.post["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axiosInstance.defaults.headers.post["Access-Control-Allow-Credentials"] = true;

export default axiosInstance;
