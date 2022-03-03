import axios, { AxiosRequestConfig } from "axios";

import { 
    UserObjectProps,
    UserObjectPropsPrivate,
    UserLoginProps,
    RoomObjectProps,
    GroupObjectProps,
    GroupRoleProps,
    GroupUserObjectProps,
    GroupPermissionProps
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

    // Access Controlled Routes
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

    static async updateUser(updateData: UserObjectPropsPrivate) {
        const response = await this.patchJson(`/users/update`, updateData);
        return {headers: response.headers, data: response.data};
    };

    static async deleteUser(updateData: UserObjectPropsPrivate) {
        const response = await this.deleteJson(`/users/delete`, updateData);
        return {headers: response.headers, data: response.data};
    };

    // General Access Routes
    static async getUserList(queryString: string) {
        const response = await this.getJson(`/users/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    static async getUserListGroup(groupID: string) {
        const response = await this.getJson(`/groups/${groupID}/users`);
        return {headers: response.headers, data: response.data};
    };

    static async getUserPublic(username: string) {
        const response = await this.getJson(`/users/up/${username}`, {username});
        return {headers: response.headers, data: response.data};
    };



    //   ____ ____   ___  _   _ ____  
    //  / ___|  _ \ / _ \| | | |  _ \ 
    // | |  _| |_) | | | | | | | |_) |
    // | |_| |  _ <| |_| | |_| |  __/ 
    //  \____|_| \_\\___/ \___/|_| 

    // Access Controlled Routes

    // ---Group Management
    static async getGroup(id: string) {
        const response = await this.getJson(`/groups/${id}`);
        return {headers: response.headers, data: response.data};
    };

    static async createGroup(data: GroupObjectProps) {
        const response = await this.postJson(`/groups`, data);
        return {headers: response.headers, data: response.data};
    };

    static async updateGroup(data: GroupObjectProps) {
        const response = await this.patchJson(`/groups`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteGroup(data: GroupObjectProps) {
        const response = await this.deleteJson(`/groups`, data);
        return {headers: response.headers, data: response.data};
    }; 

    // ---Group Role Management
    static async getGroupRoles(id: string) {
        const response = await this.getJson(`/groups/${id}/roles`);
        return {headers: response.headers, data: response.data};
    };

    static async createGroupRole(id: string, data: GroupRoleProps) {
        const response = await this.postJson(`/groups/${id}/roles`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteGroupRole(id: string, data: GroupRoleProps) {
        const response = await this.deleteJson(`/groups/${id}/roles`, data);
        return {headers: response.headers, data: response.data};
    }; 

    // ---Group User Management
    static async getGroupUsers(id: string) {
        const response = await this.getJson(`/groups/${id}/users`);
        return {headers: response.headers, data: response.data};
    };

    static async createGroupUser(id: string, data: UserObjectProps) {
        const response = await this.postJson(`/groups/${id}/users`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteGroupUser(id: string, data: UserObjectProps) {
        const response = await this.deleteJson(`/groups/${id}/users`, data);
        return {headers: response.headers, data: response.data};
    }; 

    // ---Group User Role Management
    static async getGroupUserRoles(gid: string, uid: string) {
        const response = await this.getJson(`/groups/${gid}/users/${uid}/roles`);
        return {headers: response.headers, data: response.data};
    };

    static async createGroupUserRole(gid: string, uid: string, data: GroupUserObjectProps) {
        const response = await this.postJson(`/groups/${gid}/users/${uid}/roles`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteGroupUserRole(gid: string, uid: string, data: GroupUserObjectProps) {
        const response = await this.deleteJson(`/groups/${gid}/users/${uid}/roles`, data);
        return {headers: response.headers, data: response.data};
    }; 

    // ---Role Permissions Management
    static async getGroupRolePermissions(gid: string, pid: string) {
        const response = await this.getJson(`/groups/${gid}/roles/${pid}`);
        return {headers: response.headers, data: response.data};
    };

    static async createGroupRolePermission(gid: string, pid: string, data: GroupPermissionProps) {
        const response = await this.postJson(`/groups/${gid}/roles/${pid}`, data);
        return {headers: response.headers, data: response.data};
    };

    static async deleteGroupRolePermission(gid: string, pid: string, data: GroupPermissionProps) {
        const response = await this.deleteJson(`/groups/${gid}/roles/${pid}`, data);
        return {headers: response.headers, data: response.data};
    }; 

    // --- Group Permissions
    static async getGroupPermissionsList(gid: string) {
        const response = await this.getJson(`/groups/${gid}/permissions`);
        return {headers: response.headers, data: response.data};
    };

    // General Access Routes
    static async getGroupList(queryString: string) {
        const response = await this.getJson(`/groups/list${queryString}`);
        return {headers: response.headers, data: response.data};
    };

    // TODO: API Endpoint needs to be built
    static async getGroupListUser() {
        const response = await this.getJson(`/users/groups`);
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