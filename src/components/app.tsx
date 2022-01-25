// React Library Imports
import { BrowserRouter } from 'react-router-dom';

// Router Imports
import RouterMain from '../routes/RouterMain';

// Theme Provider Imports
import { ThemeProvider } from "@mui/material"
import baseTheme from '../styles/baseTheme';

// Authorization Imports
import { AuthProvider } from "../providers/authProvider";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ThemeProvider theme={baseTheme}>
                    <RouterMain/>
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
