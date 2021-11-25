import axios, { AxiosError, ResponseType } from 'axios';
import { SIGNAL_SERVER_API_URL } from '../config/config';


class apiSignalServer {

/**
  ___ _   _ _____ _____ ____  _   _    _    _     
 |_ _| \ | |_   _| ____|  _ \| \ | |  / \  | |    
  | ||  \| | | | |  _| | |_) |  \| | / _ \ | |    
  | || |\  | | | | |___|  _ <| |\  |/ ___ \| |___ 
 |___|_| \_| |_| |_____|_| \_\_| \_/_/   \_\_____|
*/

    static _handleError(e: unknown) {
        if (axios.isAxiosError(e)) {
            const serverError = e as AxiosError;
            if (serverError && serverError.response) {
                return serverError.response.data;
            }
        };
        return { error: "Error accessing service" };
    };

    static async _get(endpoint: string, queryParams: Object={}, responseType: ResponseType="json") {
        try {
            return (
                await axios({
                    method: 'get',
                    baseURL: SIGNAL_SERVER_API_URL,
                    url: endpoint,
                    withCredentials: true,
                    params: queryParams,
                    responseType
                })
            )   
        } catch (error) {
            this._handleError(error);
        }
    };

    static async _post(endpoint: string, payload: Object) {
        try {
            return (
                await axios({
                    method: 'post',
                    baseURL: SIGNAL_SERVER_API_URL,
                    url: endpoint,
                    withCredentials: true,
                    data: payload
                })
            )   
        } catch (error) {
            this._handleError(error);
        }
    };

    static async _put(endpoint: string, payload: Object) {
        try {
            return (
                await axios({
                    method: 'put',
                    baseURL: SIGNAL_SERVER_API_URL,
                    url: endpoint,
                    withCredentials: true,
                    data: payload
                })
            )   
        } catch (error) {
            this._handleError(error);
        }
    };

    static async _patch(endpoint: string, payload: Object) {
        try {
            return (
                await axios({
                    method: 'patch',
                    baseURL: SIGNAL_SERVER_API_URL,
                    url: endpoint,
                    withCredentials: true,
                    data: payload
                })
            )   
        } catch (error) {
            this._handleError(error);
        }
    };

    static async _delete(endpoint: string) {
        try {
            return (
                await axios({
                    method: 'delete',
                    baseURL: SIGNAL_SERVER_API_URL,
                    url: endpoint,
                    withCredentials: true
                })
            )   
        } catch (error) {
            this._handleError(error);
        }
    };

/**
     _    _   _  ___  _   _     ____  _____ ____ ____ ___ ___  _   _ 
    / \  | \ | |/ _ \| \ | |   / ___|| ____/ ___/ ___|_ _/ _ \| \ | |
   / _ \ |  \| | | | |  \| |   \___ \|  _| \___ \___ \| | | | |  \| |
  / ___ \| |\  | |_| | |\  |    ___) | |___ ___) |__) | | |_| | |\  |
 /_/   \_\_| \_|\___/|_| \_|   |____/|_____|____/____/___\___/|_| \_|
*/




/**
     _   _   _ _____ _   _     ____  _____ ____ ____ ___ ___  _   _ 
    / \ | | | |_   _| | | |   / ___|| ____/ ___/ ___|_ _/ _ \| \ | |
   / _ \| | | | | | | |_| |   \___ \|  _| \___ \___ \| | | | |  \| |
  / ___ \ |_| | | | |  _  |    ___) | |___ ___) |__) | | |_| | |\  |
 /_/   \_\___/  |_| |_| |_|   |____/|_____|____/____/___\___/|_| \_|
*/



/**
  ____   ___   ___  __  __ 
 |  _ \ / _ \ / _ \|  \/  |
 | |_) | | | | | | | |\/| |
 |  _ <| |_| | |_| | |  | |
 |_| \_\\___/ \___/|_|  |_|
*/

    static async getAnonRoom() {
        const res = await this._get("/room/new");
        return res?.data;
    };

    static async getAnonRoomUser(roomID: string) {
        const res = await this._get(`/room/${roomID}/newUser`);
        return res?.data;
    };


}

export default apiSignalServer;