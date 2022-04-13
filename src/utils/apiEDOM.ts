import axios, { AxiosRequestConfig } from "axios";

import { 
    UserObjectProps,
    UserObjectPropsPrivate,
    UserLoginProps,
    RoomObjectProps,
    GroupObjectProps,
    GroupRoleProps,
    GroupUserObjectProps,
    GroupPermissionProps,
    UserRequestProps,
    GroupRequestProps
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

    
    //  _   _ ____  _____ ____  
    // | | | / ___|| ____|  _ \ 
    // | | | \___ \|  _| | |_) |
    // | |_| |___) | |___|  _ < 
    //  \___/|____/|_____|_| \_\

    // Authentication Routes
    static async registerUser(input: UserObjectPropsPrivate) {
        const response = await this.postJson(`/user/register`, input);
        return {headers: response.headers, data: response.data};
    };

    static async loginUser(input: UserLoginProps) {
        const response = await this.postJson(`/user/auth`, input);
        return {headers: response.headers, data: response.data};
    };

    static async logoutUser() {
        const response = await this.postJson(`/user/logout`, {});
        return {headers: response.headers, data: response.data};
    };

    // Data Retrieval / Manipulation Routes
    static async updateUser(input: UserObjectPropsPrivate) {
        const response = await this.patchJson(`/user/update`, input);
        return {headers: response.headers, data: response.data};
    };

    static async deleteUser(input: UserObjectPropsPrivate) {
        const response = await this.deleteJson(`/user/delete`, input);
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

    static async getUserGroups(username: string) {
        const response = await this.getJson(`/user/dm/${username}/group`, {username});
        return {headers: response.headers, data: response.data};
    };

    static async getUserRooms(username: string) {
        const response = await this.getJson(`/user/dm/${username}/room`, {username});
        return {headers: response.headers, data: response.data};
    };

    static async getUserEquip(username: string) {
        const response = await this.getJson(`/user/dm/${username}/equip`, {username});
        return {headers: response.headers, data: response.data};
    };

    static async getRequests() {
        const response = await this.getJson(`/user/request`, {});
        return {headers: response.headers, data: response.data};
    };

    static async createRequest(input: UserRequestProps) {
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

    static async createGroup(data: GroupObjectProps) {
        const response = await this.postJson(`/group`, data);
        return {headers: response.headers, data: response.data};
    };

    static async updateGroup(id: string, data: GroupObjectProps) {
        const response = await this.patchJson(`/group/${id}`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteGroup(id: string, data: GroupObjectProps) {
        const response = await this.deleteJson(`/group/${id}`, data);
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

    static async createGroupRequest(id: string, data: GroupRequestProps) {
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

    static async actGroupRole(id: string, data: GroupRoleProps) {
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

    static async actGroupUser(id: string, data: UserObjectProps) {
        const response = await this.postJson(`/groups/${id}/gm/user`, data);
        return {headers: response.headers, data: response.data};
    };


    // ---Permission Management
    static async getGroupPermissionList(id: string) {
        const response = await this.getJson(`/groups/${id}/gm/perm`);
        return {headers: response.headers, data: response.data};
    };

    static async actGroupRolePermission(id: string, data: GroupPermissionProps) {
        const response = await this.postJson(`/groups/${id}/gm/perm`, data);
        return {headers: response.headers, data: response.data};
    };



    //  ____   ___   ___  __  __ 
    // |  _ \ / _ \ / _ \|  \/  |
    // | |_) | | | | | | | |\/| |
    // |  _ <| |_| | |_| | |  | |
    // |_| \_\\___/ \___/|_|  |_|

    // Access Controlled Routes
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

    // General Access Routes
    static async getRoomList(queryString: string) {
        const response = await this.getJson(`/rooms/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async getRoomListUser() {
        const response = await this.getJson(`/users/rooms/list`);
        return {headers: response.headers, data: response.data};
    };

    static async getRoomListGroup(groupID: string) {
        const response = await this.getJson(`/groups/${groupID}/rooms/list`);
        return {headers: response.headers, data: response.data};
    };


    //  _____ ___  _   _ ___ ____  
    // | ____/ _ \| | | |_ _|  _ \ 
    // |  _|| | | | | | || || |_) |
    // | |__| |_| | |_| || ||  __/ 
    // |_____\__\_\\___/|___|_|   

    // Access Controlled Routes
    static async getEquip(id: string) {
        const response = await this.getJson(`/equips/${id}`);
        return {headers: response.headers, data: response.data};
    };

    static async createEquip(data: RoomObjectProps) {
        const response = await this.postJson(`/equips`, data);
        return {headers: response.headers, data: response.data};
    };

    static async updateEquip(data: RoomObjectProps) {
        const response = await this.patchJson(`/equips`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteEquip(data: RoomObjectProps) {
        const response = await this.deleteJson(`/equips`, data);
        return {headers: response.headers, data: response.data};
    }; 

    // General Access Routes
    static async getEquipList(queryString: string) {
        const response = await this.getJson(`/equips/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async getEquipListUser() {
        const response = await this.getJson(`/users/equips/list`);
        return {headers: response.headers, data: response.data};
    };

    static async getEquipListGroup(groupID: string) {
        const response = await this.getJson(`/groups/${groupID}/equips/list`);
        return {headers: response.headers, data: response.data};
    };

    static async getEquipListRoom(roomID: string) {
        const response = await this.getJson(`/equips/rooms/${roomID}`);
        return {headers: response.headers, data: response.data};
    };
};

export default apiEDOM;