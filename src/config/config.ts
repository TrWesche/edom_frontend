
export const SIGNAL_SERVER_API_URL = process.env.REACT_APP_SIGNAL_SERVER_API_URL || "https://u0134-m21p-01:3001/";

export const SIGNAL_SERVER_WS_URL = process.env.REACT_APP_SIGNAL_SERVER_WS_URL || "wss://u0134-m21p-01:3001/";

export const RTCP_ICE_CONFIG = {
        iceServers: [
            {urls: 'stun:stun1.l.google.com:19302'}
        ]
    };

export const EDOM_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtG+Yf/13Sk3sU4cewGyd
MFqGpgZyq7nyyqnDSyLsp604+IjVNkQy2TC7ZWuAXNgrhQe/8iIJKX3WI6ztHZd2
7oNMXHjZLzE9UFr1vgbSyqqWBfEfyl9vvqfW+gNtPA8KyJCd1X1T2sqfPQfp7bd5
rmpG1dG9PeP6/uj+TDfmDjOXK4jGzyqTM2QXNnJlYWjq30lI1P32Ot6Tm73hrjTg
Xr+XO4uOPjgdah796dYz9iGYaqgCDoPP/gta5HEFpWXRc6zbHMdqYPdIAkbWhrE1
SXpxFSgT3MxTIgRVrOldtsfyVqJ0pJgzOSU0JFW33270mux7cLNyBkmygTO+AVgZ
KQIDAQAB
-----END PUBLIC KEY-----`;