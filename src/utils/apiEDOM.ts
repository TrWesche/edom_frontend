import axios, { AxiosRequestConfig } from "axios";

import { 
    UserObjectProps,
    UserObjectPropsPrivate,
    UserLoginProps,
    RoomObjectProps,
    GroupObjectProps
} from '../interfaces/globalInterfaces'

const apiURL = process.env.REACT_APP_EDOM_API_URL;

class apiEDOM {
    // Control Functions
    static async getJson(endpoint: string, params?: object) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'get',
                baseURL: apiURL,
                url: endpoint,
                params: params ? params : {},
                withCredentials: true,
                responseType: 'json'
            }

            return (await axios.request(axiosConfig))
        } catch (error: any) {
            console.log(`API Error:`, error.response);
            const message = error.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    static async postJson(endpoint: string, data: object) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'post',
                baseURL: apiURL,
                url: endpoint,
                data: data,
                withCredentials: true,
                responseType: 'json'
            }

            return (await axios.request(axiosConfig))
        } catch (error: any) {
            console.log(`API Error:`, error.response);
            const message = error.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    static async patchJson(endpoint: string, data: object) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'patch',
                baseURL: apiURL,
                url: endpoint,
                data: data,
                withCredentials: true,
                responseType: 'json'
            }

            return (await axios.request(axiosConfig))
        } catch (error: any) {
            console.log(`API Error:`, error.response);
            const message = error.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    static async deleteJson(endpoint: string, data: object) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'delete',
                baseURL: apiURL,
                url: endpoint,
                data: data,
                withCredentials: true,
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

    // User Functions
    static async registerUser(userData: UserObjectPropsPrivate) {
        const response = await this.postJson(`/users/register`, userData);
        return {headers: response.headers, data: response.data};
    };

    static async loginUser(loginData: UserLoginProps) {
        const response = await this.postJson(`/users/auth`, loginData);
        return {headers: response.headers, data: response.data};
    };

    static async getUserSecure() {
        const response = await this.getJson(`/users/profile`, {});
        return {headers: response.headers, data: response.data};
    };

    static async getUserPublic(username: string) {
        const response = await this.getJson(`/users/up/${username}`, {username});
        return {headers: response.headers, data: response.data};
    };

    static async updateUserSecure(updateData: UserObjectPropsPrivate) {
        const response = await this.patchJson(`/users/update`, updateData);
        return {headers: response.headers, data: response.data};
    };


    // Group Functions
    static async getGroupList(queryString: string) {
        const response = await this.getJson(`/groups/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async getGroup(id: string) {
        const response = await this.getJson(`/groups/${id}`);
        return {headers: response.headers, data: response.data};
    };

    static async createGroup(data: GroupObjectProps) {
        const response = await this.postJson(`/rooms`, data);
        return {headers: response.headers, data: response.data};
    };

    static async updateGroup(data: GroupObjectProps) {
        const response = await this.patchJson(`/rooms`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteGroup(data: GroupObjectProps) {
        const response = await this.deleteJson(`/rooms`, data);
        return {headers: response.headers, data: response.data};
    }; 


    // Room Functions
    static async getRoomList(queryString: string) {
        const response = await this.getJson(`/rooms/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async getRoom(id: string) {
        const response = await this.getJson(`/rooms/${id}`);
        return {headers: response.headers, data: response.data};
    };

    static async createRoom(data: RoomObjectProps) {
        const response = await this.postJson(`/rooms`, data);
        return {headers: response.headers, data: response.data};
    };

    static async updateRoom(data: RoomObjectProps) {
        const response = await this.patchJson(`/rooms`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteRoom(data: RoomObjectProps) {
        const response = await this.deleteJson(`/rooms`, data);
        return {headers: response.headers, data: response.data};
    }; 
};

export default apiEDOM;