import axiosInstance from "../utils/axios";

class Queries {
    getComments() {
        return axiosInstance.get("/comments");
    }
}

export default new Queries();
