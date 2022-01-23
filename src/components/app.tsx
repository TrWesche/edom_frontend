// React Library Imports
import {useState, useEffect} from "react";
import { BrowserRouter } from 'react-router-dom';

// Router Imports
import RouterMain from '../routes/RouterMain';

// Theme Provider Imports
import { ThemeProvider } from "@mui/material"
import baseTheme from '../styles/baseTheme';

// Authorization Imports
import {defaultContext, sessionTokenVerify, AuthContext } from '../providers/authProvider';

function App() {
    const [authorizations, setAuthorizations] = useState(defaultContext);

    useEffect(() => {
        const tokenVerifyResult = sessionTokenVerify();
        setAuthorizations(tokenVerifyResult);
    }, []);

    return (
        <AuthContext.Provider value={authorizations}>
            <BrowserRouter>
                <ThemeProvider theme={baseTheme}>
                    <RouterMain/>
                </ThemeProvider>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
