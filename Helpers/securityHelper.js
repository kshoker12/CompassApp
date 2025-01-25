import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { LIFE_MANAGEMENT_DB_BASE } from '../Constants/Links';

/** 
 * @description Login and authenticate application
 * @param {string} passcode Passcode user types
 * @returns {Object}
 */
const login = async (passcode) => {
    await axios
        .post(`${LIFE_MANAGEMENT_DB_BASE}/api/login/`, 
        { passcode }, // Correctly passing the data (body of the POST request)
        { headers: { 'Content-Type': 'application/json' } } // Headers should be a separate object
        )
        .then(async (response) => {
            // Directly use response.data since Axios parses JSON by default
            const data = response.data; 
            await SecureStore.setItemAsync('accessToken', data.access);
            await SecureStore.setItemAsync('refreshToken', data.refresh);
            console.log('Login successful');
        })
        .catch((error) => {
            console.error('Invalid passcode or error occurred:', error.response?.data || error.message);
        });
};

const apiClient = axios.create({
    baseURL: LIFE_MANAGEMENT_DB_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => {
        console.log('Response Interceptor Hit'); // Debug log
        return response;
    },
    async (error) => {
        console.log('Error Interceptor Hit:', error.response?.status); // Debug log
        const originalRequest = error.config;
        console.log(originalRequest)

        if (error.response?.status === 403 && !originalRequest._retry) {
            console.log('401 detected, attempting token refresh...');
            originalRequest._retry = true;

            try {
                const refreshToken = await SecureStore.getItemAsync('refreshToken');
                if (!refreshToken) {
                    console.error('Refresh token missing');
                    throw error;
                }

                const response = await axios.post(`${LIFE_MANAGEMENT_DB_BASE}/api/token/refresh/`, {
                    refresh: refreshToken,
                });

                const newAccessToken = response.data.access;
                await SecureStore.setItemAsync('accessToken', newAccessToken);

                apiClient.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError.response?.data || refreshError.message);
                throw refreshError;
            }
        }

        throw error;
    }
);

export default apiClient;

export {login, apiClient}