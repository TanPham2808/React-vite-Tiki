import axios from "../utils/axios-customize";

const fetchUserAPI = (currentPage, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${currentPage}&pageSize=${pageSize}`
    return axios.get(URL_BACKEND);
}

export { fetchUserAPI }