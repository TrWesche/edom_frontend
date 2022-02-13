// Resources Used:
// https://www.telerik.com/blogs/understand-react-context-api
// https://stackoverflow.com/questions/65889422/context-provider-in-typescript#:~:text=Generally%20you%20would%20want%20to%20type%20your%20context%2C,the%20consumer%20of%20LoadContext%20the%20types%20are%20known.
// https://www.becomebetterprogrammer.com/typescript-pass-function-as-a-parameter/#:~:text=Similar%20to%20JavaScript%2C%20to%20pass%20a%20function%20as,calling%20the%20foo%20function%20in%20the%20following%20example%3A

import { createContext, useState, useContext, useEffect, FC } from "react";
import * as jwt from "jsonwebtoken";
import { EDOM_PUBLIC_KEY } from "../config/config";

// TODO: Update Backend to Match Version Below
// Start Temporary ---- Until New Version of Backend JWT Token Formation Completed
// Need to add "Logged In" Boolean for Basic Checks
export interface authToken extends jwt.JwtPayload {
    logged_in?: boolean
    init?: boolean
    id?: string
    username?: string
    roles?: Array<object>
};

const defaultAuth: authToken = {
    logged_in: false,
    init: false,
    id: "",
    username: "Visitor",
    roles: [
        {
            "name": "visitor"
        }
    ]
};

interface context {
    authData: authToken
    updateAuth?: Function
};

const defaultContext: context = {
    authData: defaultAuth,
    updateAuth: undefined
};


// End Temporary


// interface edomSessionToken extends jwt.JwtPayload {
//     id?: string
//     username?: string
//     sroles?: Array<edomSiteAuthorization>
//     groles?: Array<edomGroupAuthorization>
// }

// interface edomSiteAuthorization {
//     roles: Array<string>
//     permissions: Array<string>
// }

// interface edomGroupAuthorization {
//     id: string,
//     roles: Array<string>,
//     permissions: Array<string>
// }

// const defaultContext: edomSessionToken = {
//     id: "",
//     username: "Visitor",
//     sroles: [
//         {
//             "roles": ["visitor"],
//             "permissions": ["site_access"]
//         }
//     ]
// };

const getCookie = (key: string) => {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

const authVerifyToken = () => {
    // Verify Token Before Storing
    const sessionToken = getCookie("sid");
    try {
        if (sessionToken) {
            const verifiedToken: authToken | string = jwt.verify(sessionToken, EDOM_PUBLIC_KEY);
            if (typeof verifiedToken === "object") {
                const returnToken = {...verifiedToken, logged_in: true, init: true};
                return returnToken;
            };
        };

        const defaultInit = {...defaultAuth, init: true};
        return defaultInit;
    } catch (error) {
        const defaultInit = {...defaultAuth, init: true};
        return defaultInit;    
    }
};

const AuthContext = createContext(defaultContext);

const AuthProvider: FC = ({children}) => {
    const [auth, setAuth] = useState(defaultAuth);

    const handleAuth = () => {
        const authorization = authVerifyToken();
        setAuth(authorization)
    };

    useEffect(() => {
        console.log("Auth Refresh Called");
        handleAuth();
    }, []);

    const data: context = {
        authData: auth,
        updateAuth: handleAuth
    };

    return (
        <AuthContext.Provider value={data}>
            { children }
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth can only be used inside AuthProvider");
    }
    return context;
};

export {
    AuthProvider,
    useAuth
};