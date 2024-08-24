import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // Lưu cook ở trình duyệt (mục đích trao đổi với BE)
});

// Gắn token (từ localStorage) vào header để call API
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` }

const handleRefreshToken = async () => {
    const res = await instance.get("/api/v1/auth/refresh");
    if (res && res.data) {
        return res.data.access_token
    } else {
        return null;
    }
}

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Cờ retry đúng 1 lần
const NO_RETRY_HEADER = 'x-no-retry'

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Nếu access_token hết hạng
    if (error.config
        && error.response
        && +error.response.status === 401
        && !error.config.headers[NO_RETRY_HEADER]
    ) {
        // Call API Refresh token
        const access_token = await handleRefreshToken();
        // Đánh dấu lại vì đã chạy qua 1 lần
        error.config.headers[NO_RETRY_HEADER] = 'true'

        if (access_token) {
            error.config.headers['Authorization'] = `Bearer ${access_token}`;
            localStorage.setItem('access_token', access_token);
            return instance.request(error.config);
        }
    }

    return error?.response?.data ?? Promise.reject(error);
});

export default instance;
