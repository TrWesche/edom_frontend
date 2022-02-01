// React Imports
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Material UI Styling System Imports
import { AlertColor, Avatar, Skeleton, Stack, styled } from '@mui/material'

import {
    Grid,
    Typography,
    IconButton,
    Button,
    Link,
    Snackbar,
    Alert
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

// Typescript Interface Imports
import { UserObjectProps } from '../../interfaces/globalInterfaces';
import { authToken, useAuth } from '../../providers/authProvider';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { fetchUserProfile } from '../../redux/actions/actUser';
import { useAlert } from '../../providers/alertProvider';

interface UserProfileProps {
    user: UserObjectProps
    isProcessing: boolean
    error?: boolean
};


const PageLoadHandler = (props: {authData: authToken, data: UserObjectProps, isProcessing: boolean, reduxError: boolean}) => {
    const navigate = useNavigate();
    const { alertSetter } = useAlert();

    const { authData, data, isProcessing, reduxError } = props; 

    const pageLoading = () => {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Grid item xs={4}>
                        <Skeleton variant="circular" width={152} height={152} />
                    </Grid>
                    <Grid item xs={8}>
                        <Skeleton variant="rectangular" width="80%" height={118} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="80%" height={118} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="80%" height={118} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="80%" height={118} />
                </Grid>
            </React.Fragment>
        );
    };

    const dataLoaded = () => {
        if (data !== undefined) {
            return (
                <Stack>
                    <Typography>{data.username ? data.username : "Failed to Retrieve Username"}</Typography>
                    <Typography>{data.first_name} {data.last_name}</Typography>
                    <Typography>{data.email ? data.email : ""}</Typography>
                </Stack>
            )
        } else {
            return (
                <Stack>
                    <Typography>Failed to Load User</Typography>
                </Stack>
            )
        }
    }

    const pageLoaded = () => {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Grid item xs={4}>
                        <Avatar 
                            alt="User Image"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                            sx={{ width: 152, height: 152 }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        {dataLoaded()}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Groups</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Rooms</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Equipment</Typography>
                </Grid>
            </React.Fragment>
        );
    };

    const pageLoadError = () => {
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Typography>Something went wrong.</Typography>
                </Grid>
            </React.Fragment>
        );
    };

    // User Logged In Check
    if (!authData.id || authData.id === '') {
        if (alertSetter) {
            alertSetter({open: true, content: "Please Login to Continue.", severity: "error"})
        };
        navigate('/');
    }

    if (reduxError) {
        return (
            <React.Fragment>
                {pageLoadError()};
            </React.Fragment>
        );
    } else if (isProcessing) {
        return (
            <React.Fragment>
                {pageLoading()};
            </React.Fragment>
        );
    } else if (!isProcessing) {
        return (
            <React.Fragment>
                {pageLoaded()};
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                {pageLoadError()};
            </React.Fragment>
        );
    };
};


const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authData } = useAuth();
    
    const params: any = useParams();
    
    const reduxPayload: UserProfileProps = useSelector((store: RootStateOrAny) => store?.redUser);
    useEffect(() => {
        dispatch(fetchUserProfile(params.username, authData));
    }, [dispatch]);


    const data: UserObjectProps = reduxPayload.user;
    const isProcessing = reduxPayload.isProcessing;
    const reduxError = reduxPayload.error ? reduxPayload.error : false;

    return (
        <Grid container spacing={2}>
            <PageLoadHandler authData={authData} data={data} isProcessing={isProcessing} reduxError={reduxError} />
        </Grid>
    )
};

export default UserProfile;