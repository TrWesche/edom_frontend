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
import { UserObjectProps, PageStatusValues } from '../../interfaces/globalInterfaces';
import { useAuth } from '../../providers/authProvider';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { fetchUserProfile } from '../../redux/actions/actUser';

interface UserProfileProps {
    data: UserObjectProps
    pagestatus: PageStatusValues
};

const PageLoadHandler = (props: {data: UserObjectProps, pagestatus: PageStatusValues}) => {
    console.log("Page Load Handler Called");
    const navigate = useNavigate();

    const { data, pagestatus } = props; 

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
                        <Stack>
                            <Typography>Username</Typography>
                            <Typography>First Name + Last Name</Typography>
                        </Stack>
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

    switch (pagestatus) {
        case 'loading':
            return (
                <React.Fragment>
                    {pageLoading()};
                </React.Fragment>
            );
        case 'loaded':
            return (
                <React.Fragment>
                    {pageLoaded()};
                </React.Fragment>
            );
        case 'error':
            return (
                <React.Fragment>
                    {pageLoadError()};
                </React.Fragment>
            );
        default:
            return (
                <React.Fragment>
                    {pageLoadError()};
                </React.Fragment>
            );
    };
};


const UserProfile = () => {
    const dispatch = useDispatch();
    const { authData, handleAuth } = useAuth();
    const params: any = useParams();

    const onLoadPageState: PageStatusValues = 'loading';
    const [pageState, setPageState] = useState<PageStatusValues>(onLoadPageState);
    
    const currentUser: UserObjectProps = useSelector((store: RootStateOrAny) => store?.currentUser);
    useEffect(() => {
        dispatch(fetchUserProfile(params.username, authData));
    }, [dispatch]);

    useEffect(() => {
        setPageState(pageLoadStatus());
    }, [currentUser]);


    const pageLoadStatus = () => {
        console.log("Page Load Status Handle Called");
        console.log(currentUser);
        let loadStatus: PageStatusValues;
        if (!currentUser || !currentUser.username) {
            loadStatus = 'loading';
        } else if (currentUser && currentUser.username) {
            loadStatus = 'loaded';
        } else {
            loadStatus = 'error';
        }

        return loadStatus;
    }

    return (
        <Grid container spacing={2}>
            <PageLoadHandler data={currentUser} pagestatus={pageState} />
        </Grid>
    )
};

export default UserProfile;