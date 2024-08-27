import axios from "../utils/axios-customize";

const fetchUserAPI = (query) => {
    const URL_BACKEND = `/api/v1/user?${query}`
    return axios.get(URL_BACKEND);
}

export { fetchUserAPI }