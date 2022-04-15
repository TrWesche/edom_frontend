// React
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Material UI
import {
    Grid
} from "@mui/material"

// Providers
import { authToken, useAuth } from '../../providers/authProvider';
import { useAlert } from '../../providers/alertProvider';

// Interface Impors
import AnonymousHome from './AnonymousHome';
import AuthenticatedHome from './AuthenticatedHome';


const PageLoadHandler = (props: {authData: authToken, navigate: NavigateFunction, alertSetter: Function | undefined }) => {
    const { authData, navigate, alertSetter } = props; 

    // User Logged In Check
    if (authData.logged_in && authData.init) {
        return (
            <React.Fragment>
                <AuthenticatedHome authData={authData} navigate={navigate} alertSetter={alertSetter} />
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <AnonymousHome authData={authData} navigate={navigate} alertSetter={alertSetter} />
            </React.Fragment>
        )
    }

};

const Home = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();

    return (
        <Grid container spacing={5} justifyContent={'center'} xs={12} padding={'20px 0 0 0'}>
            <PageLoadHandler 
                authData={authData}
                navigate={navigate}
                alertSetter={alertSetter}
            />
        </Grid>
    );
};

export default Home;