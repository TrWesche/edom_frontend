
export const SIGNAL_SERVER_API_URL = process.env.REACT_APP_SIGNAL_SERVER_API_URL || "https://u0134-m21p-01:3001/";

export const SIGNAL_SERVER_WS_URL = process.env.REACT_APP_SIGNAL_SERVER_WS_URL || "wss://u0134-m21p-01:3001/";

export const RTCP_ICE_CONFIG = {
        iceServers: [
            {urls: 'stun:stun1.l.google.com:19302'}
        ]
    };