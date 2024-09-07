import axios from "../utils/axios-customize";

const fetchUserAPI = (query) => {
    const URL_BACKEND = `/api/v1/user?${query}`
    return axios.get(URL_BACKEND);
}

const createUserAPI = (fullName, password, email, phone) => {
    const URL_BACKEND = `/api/v1/user`
    const data = {
        fullName: fullName,
        password: password,
        email: email,
        phone: phone
    }
    return axios.post(URL_BACKEND, data);
}

const createListUserAPI = (lstUser) => {
    const URL_BACKEND = `/api/v1/user/bulk-create`
    return axios.post(URL_BACKEND, lstUser);
}

const updateUserAPI = (id, fullName, phone) => {
    const URL_BACKEND = `/api/v1/user`
    const data = {
        _id: id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data);
}

export { fetchUserAPI, createUserAPI, createListUserAPI, updateUserAPI }