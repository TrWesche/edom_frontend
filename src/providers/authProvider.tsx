// Resources Used:
// https://www.telerik.com/blogs/understand-react-context-api
// https://stackoverflow.com/questions/65889422/context-provider-in-typescript#:~:text=Generally%20you%20would%20want%20to%20type%20your%20context%2C,the%20consumer%20of%20LoadContext%20the%20types%20are%20known.
// https://www.becomebetterprogrammer.com/typescript-pass-function-as-a-parameter/#:~:text=Similar%20to%20JavaScript%2C%20to%20pass%20a%20function%20as,calling%20the%20foo%20function%20in%20the%20following%20example%3A

import { createContext, useState, useContext, ReactChildren, FC } from "react";
import * as jwt from "jsonwebtoken";
import { EDOM_PUBLIC_KEY } from "../config/config";

// TODO: Update Backend to Match Version Below
// Start Temporary ---- Until New Version of Backend JWT Token Formation Completed
export interface authToken extends jwt.JwtPayload {
    id?: string
    username?: string
    roles?: Array<object>
};

interface context {
    authData?: authToken
    handleAuth?: Function
};

const defaultContext: context = {
    authData: {
        id: "",
        username: "Visitor",
        roles: [
            {
                "name": "visitor"
            }
        ]
    }
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

const sessionStoreToken = (incomingToken: string) => {
    // Verify Token Before Storing
    const verifiedToken = jwt.verify(incomingToken, EDOM_PUBLIC_KEY);
    if (typeof verifiedToken === "object") {
        sessionStorage.setItem("authToken", incomingToken);
        return verifiedToken;
    };

    return defaultContext;
};

const sessionTokenVerify = () => {
    const unverifiedToken = sessionStorage.getItem("authToken");

    // Load Session Token
    if (unverifiedToken) {
        // Verify Token Validity
        const verifiedToken = jwt.verify(unverifiedToken, EDOM_PUBLIC_KEY);
        if (typeof verifiedToken === "object") {
            // Check Token Contents and Return
            const payload: authToken = verifiedToken;
            if (payload.id) {
                return payload;
            }
        }
    };

    return defaultContext;
}

const AuthContext = createContext(defaultContext);

const AuthProvider: FC = ({children}) => {
    const [auth, setAuth] = useState(defaultContext);

    const handleAuth = (refreshToken?: boolean, tokenValue?: string) => {
        let authorization = defaultContext;

        if (refreshToken && tokenValue) {
            authorization.authData = sessionStoreToken(tokenValue);
        } else {
            authorization.authData = sessionTokenVerify();
        }
        setAuth(authorization)
    };

    const data = {...auth, handleAuth};

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