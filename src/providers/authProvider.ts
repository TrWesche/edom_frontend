import { createContext } from "react";
import * as jwt from "jsonwebtoken";
import { EDOM_PUBLIC_KEY } from "../config/config";

// TODO: Update Backend to Match Version Below
// Start Temporary ---- Until New Version of Backend JWT Token Formation Completed
interface edomSessionToken extends jwt.JwtPayload {
    id?: string
    username?: string
    roles?: Array<object>
};

const defaultContext: edomSessionToken = {
    id: "",
    username: "Visitor",
    roles: [
        {
            "name": "visitor"
        }
    ]
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

const sessionTokenVerify = () => {
    const unverifiedToken = sessionStorage.getItem("sid");

    // Load Session Token
    if (unverifiedToken) {
        // Verify Token Validity
        const verifiedToken = jwt.verify(unverifiedToken, EDOM_PUBLIC_KEY);
        if (typeof verifiedToken === "object") {
            // Check Token Contents and Return
            const payload: edomSessionToken = verifiedToken;
            if (payload.id) {
                return payload;
            }
        }
    };

    return defaultContext;
}

const AuthContext = createContext(defaultContext);

export {
    defaultContext,
    sessionTokenVerify,
    AuthContext
};