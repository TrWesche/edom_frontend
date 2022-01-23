import axios, { AxiosRequestConfig } from "axios";

import { UserObjectProps } from '../interfaces/globalInterfaces'

const apiURL = process.env.REACT_APP_EDOM_API_URL;

class apiEDOM {
    // Control Functions
    static async getJson(endpoint: string, params?: object, authToken?: string) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'get',
                baseURL: apiURL,
                url: endpoint,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                params: params ? params : {},
                withCredentials: authToken ? true : false,
                responseType: 'json'
            }

            return (await axios.request(axiosConfig))
        } catch (error: any) {
            console.log(`API Error:`, error.response);
            const message = error.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    static async postJson(endpoint: string, data: object, authToken?: string) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'post',
                baseURL: apiURL,
                url: endpoint,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                data: data,
                withCredentials: authToken ? true : false,
                responseType: 'json'
            }

            return (await axios.request(axiosConfig))
        } catch (error: any) {
            console.log(`API Error:`, error.response);
            const message = error.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    static async patchJson(endpoint: string, data: object, authToken?: string) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'patch',
                baseURL: apiURL,
                url: endpoint,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                data: data,
                withCredentials: authToken ? true : false,
                responseType: 'json'
            }

            return (await axios.request(axiosConfig))
        } catch (error: any) {
            console.log(`API Error:`, error.response);
            const message = error.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    static async deleteJson(endpoint: string, data: object, authToken?: string) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'delete',
                baseURL: apiURL,
                url: endpoint,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                data: data,
                withCredentials: authToken ? true : false,
                responseType: 'json'
            }

            return (await axios.request(axiosConfig))
        } catch (error: any) {
            console.log(`API Error:`, error.response);
            const message = error.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    // Process Functions
    static async registerUser(userData: UserObjectProps) {
        const response = await this.postJson("/users/register", userData);
        return {headers: response.headers, data: response.data};
    };

};

export default apiEDOM;