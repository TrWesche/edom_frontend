// Library Imports
import axios, { AxiosRequestConfig } from "axios";

// Typescript Interfaces
import { 
    RequestUserLogin, 
    RequestUserObject, 
    RequestUserRequest
} from "../interfaces/edomUserInterfaces";

import { 
    RequestGroupObject, 
    RequestGroupRequest, 
    RequestGroupRole, 
    RequestGroupRolePermission, 
    RequestUserManagement 
} from "../interfaces/edomGroupInterfaces";

import { 
    RequestRoomEquip, 
    RequestRoomObject 
} from "../interfaces/edomRoomInterfaces";

import { 
    RequestEquipObject 
} from "../interfaces/edomEquipInterfaces";

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

    static async deleteJson(endpoint: string) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'delete',
                baseURL: apiURL,
                url: endpoint,
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

    
    //  _   _ ____  _____ ____  
    // | | | / ___|| ____|  _ \ 
    // | | | \___ \|  _| | |_) |
    // | |_| |___) | |___|  _ < 
    //  \___/|____/|_____|_| \_\

    // Authentication Routes
    static async registerUser(input: RequestUserObject) {
        const response = await this.postJson(`/user/register`, input);
        return {headers: response.headers, data: response.data};
    };

    static async loginUser(input: RequestUserLogin) {
        const response = await this.postJson(`/user/auth`, input);
        return {headers: response.headers, data: response.data};
    };

    static async logoutUser() {
        const response = await this.postJson(`/user/logout`, {});
        return {headers: response.headers, data: response.data};
    };

    // Data Retrieval / Manipulation Routes
    static async updateUser(input: RequestUserObject) {
        const response = await this.patchJson(`/user/update`, input);
        return {headers: response.headers, data: response.data};
    };

    static async deleteUser() {
        const response = await this.deleteJson(`/user/delete`);
        return {headers: response.headers, data: response.data};
    };

    static async getUserList(queryString: string) {
        const response = await this.getJson(`/user/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async getUserSelf() {
        const response = await this.getJson(`/user/profile`, {});
        return {headers: response.headers, data: response.data};
    };

    static async getUserProfile(username: string) {
        const response = await this.getJson(`/user/dm/${username}`, {username});
        return {headers: response.headers, data: response.data};
    };

    static async getUserGroups(username: string, queryString: string) {
        const response = await this.getJson(`/user/dm/${username}/group${queryString}`, {username});
        return {headers: response.headers, data: response.data};
    };

    static async getUserRooms(username: string, queryString: string) {
        const response = await this.getJson(`/user/dm/${username}/room${queryString}`, {username});
        return {headers: response.headers, data: response.data};
    };

    static async getUserEquip(username: string, queryString: string) {
        const response = await this.getJson(`/user/dm/${username}/equip${queryString}`, {username});
        return {headers: response.headers, data: response.data};
    };

    static async getUserRequests() {
        const response = await this.getJson(`/user/request`, {});
        return {headers: response.headers, data: response.data};
    };

    static async createUserRequest(input: RequestUserRequest) {
        const response = await this.postJson(`/user/request`, input);
        return {headers: response.headers, data: response.data};
    };



    //   ____ ____   ___  _   _ ____  
    //  / ___|  _ \ / _ \| | | |  _ \ 
    // | |  _| |_) | | | | | | | |_) |
    // | |_| |  _ <| |_| | |_| |  __/ 
    //  \____|_| \_\\___/ \___/|_| 

    // --- Site Functions
    static async getGroupList(queryString: string) {
        const response = await this.getJson(`/group/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    // --- Core Group Actions
    static async getGroup(id: string) {
        const response = await this.getJson(`/group/${id}`);
        return {headers: response.headers, data: response.data};
    };

    static async createGroup(data: RequestGroupObject) {
        const response = await this.postJson(`/group`, data);
        return {headers: response.headers, data: response.data};
    };

    static async updateGroup(id: string, data: RequestGroupObject) {
        const response = await this.patchJson(`/group/${id}`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteGroup(id: string) {
        const response = await this.deleteJson(`/group/${id}`);
        return {headers: response.headers, data: response.data};
    }; 

    // --- Group Resource Browse 
    static async getGroupUsers(id: string, queryString: string) {
        const response = await this.getJson(`/group/${id}/user${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async getGroupRooms(id: string, queryString: string) {
        const response = await this.getJson(`/group/${id}/room${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async getGroupEquip(id: string, queryString: string) {
        const response = await this.getJson(`/group/${id}/equip${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    // --- Group Request Control
    static async getGroupRequests(id: string) {
        const response = await this.getJson(`/group/${id}/gm/req`);
        return {headers: response.headers, data: response.data};
    };

    static async createGroupRequest(id: string, data: RequestGroupRequest) {
        const response = await this.postJson(`/group/${id}/gm/req`, data);
        return {headers: response.headers, data: response.data};
    };

    // ---Group Role Management
    static async getGroupRoleList(id: string) {
        const response = await this.getJson(`/group/${id}/gm/role`);
        return {headers: response.headers, data: response.data};
    };

    static async getGroupRole(id: string, rolename: string) {
        const response = await this.getJson(`/group/${id}/gm/role/${rolename}`);
        return {headers: response.headers, data: response.data};
    };

    static async actGroupRole(id: string, data: RequestGroupRole) {
        const response = await this.postJson(`/group/${id}/roles`, data);
        return {headers: response.headers, data: response.data};
    };

    // ---Group User Management
    static async getGroupUsersMgmt(id: string) {
        const response = await this.getJson(`/group/${id}/gm/user`);
        return {headers: response.headers, data: response.data};
    };

    static async getGroupUser(id: string, username: string) {
        const response = await this.getJson(`/group/${id}/gm/user/${username}`);
        return {headers: response.headers, data: response.data};
    };

    static async actGroupUser(id: string, data: RequestUserManagement) {
        const response = await this.postJson(`/groups/${id}/gm/user`, data);
        return {headers: response.headers, data: response.data};
    };


    // ---Permission Management
    static async getGroupPermissionList(id: string) {
        const response = await this.getJson(`/groups/${id}/gm/perm`);
        return {headers: response.headers, data: response.data};
    };

    static async actGroupRolePermission(id: string, data: RequestGroupRolePermission) {
        const response = await this.postJson(`/groups/${id}/gm/perm`, data);
        return {headers: response.headers, data: response.data};
    };



    //  ____   ___   ___  __  __ 
    // |  _ \ / _ \ / _ \|  \/  |
    // | |_) | | | | | | | |\/| |
    // |  _ <| |_| | |_| | |  | |
    // |_| \_\\___/ \___/|_|  |_|

    // General Access Routes
    static async getRoomList(queryString: string) {
        const response = await this.getJson(`/room/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    // Core Routes
    static async getRoom(id: string) {
        const response = await this.getJson(`/room/${id}`);
        return {headers: response.headers, data: response.data};
    };

    static async createRoom(data: RequestRoomObject) {
        const response = await this.postJson(`/room/create`, data);
        return {headers: response.headers, data: response.data};
    };

    static async updateRoom(id: string, data: RequestRoomObject) {
        const response = await this.patchJson(`/room/${id}`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteRoom(id: string) {
        const response = await this.deleteJson(`/room/${id}`);
        return {headers: response.headers, data: response.data};
    }; 

    // Room Equip Control
    static async getRoomEquip(id: string, queryString: string) {
        const response = await this.getJson(`/room/${id}/equip${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async actRoomEquip(id: string, data: RequestRoomEquip) {
        const response = await this.postJson(`/room/${id}/equip`, data);
        return {headers: response.headers, data: response.data};
    };



    //  _____ ___  _   _ ___ ____  
    // | ____/ _ \| | | |_ _|  _ \ 
    // |  _|| | | | | | || || |_) |
    // | |__| |_| | |_| || ||  __/ 
    // |_____\__\_\\___/|___|_|   

    // General Access Routes
    static async getEquipList(queryString: string) {
        const response = await this.getJson(`/equip/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    // Access Controlled Routes
    static async getEquip(id: string) {
        const response = await this.getJson(`/equip/${id}`);
        return {headers: response.headers, data: response.data};
    };

    static async createEquip(data: RequestEquipObject) {
        const response = await this.postJson(`/equip`, data);
        return {headers: response.headers, data: response.data};
    };

    static async updateEquip(id: string, data: RequestEquipObject) {
        const response = await this.patchJson(`/equip/${id}`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteEquip(id: string) {
        const response = await this.deleteJson(`/equip/${id}`);
        return {headers: response.headers, data: response.data};
    }; 

    static async getEquipRoom(id: string) {
        const response = await this.getJson(`/equip/${id}/room`);
        return {headers: response.headers, data: response.data};
    };
};

export default apiEDOM;