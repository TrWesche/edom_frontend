// React Imports
import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

// Material UI Styling System Imports
import { Avatar, Skeleton, Stack } from '@mui/material'

import {
    Grid,
    Typography,
    Paper,
    Box
} from "@mui/material";

// import {
//     Visibility,
//     VisibilityOff
// } from "@mui/icons-material";

// Typescript Interface Imports
import { ReturnUserObject } from '../../interfaces/edomUserInterfaces';
import { authToken, useAuth } from '../../providers/authProvider';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { fetchUserProfile } from '../../redux/actions/actUser';
import { useAlert } from '../../providers/alertProvider';

// TODO: This will need to have a Private / Public Component
interface UserProfileProps {
    user: ReturnUserObject
    isProcessing: boolean
    error?: boolean
};


const PageLoadHandler = (props: {authData: authToken, navigate: NavigateFunction, alertSetter: Function | undefined, data: ReturnUserObject, isProcessing: boolean, reduxError: boolean}) => {
    const { authData, navigate, alertSetter, data, isProcessing, reduxError } = props; 

    const pageLoading = () => {
        return (
            <Paper elevation={3} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                <Box  sx={{
                    display: 'grid',
                    width: '100%',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `
                        "avatar details details details details details"
                        "info info info info info info"
                    `,
                    }}
                >
                    <Box sx={{ gridArea: 'avatar'}}>
                        <Skeleton variant="circular" width={152} height={152} />
                    </Box>
                    <Box sx={{ gridArea: 'details'}}>
                        <Skeleton variant="rectangular" height={152} />
                    </Box>

                    <Box sx={{ gridArea: 'info'}}>
                        <Skeleton variant="rectangular" height={400} />
                    </Box>
                </Box>
            </Paper>
        );
    };

    const dataLoaded = () => {
        if (data !== undefined) {
            return (
                <Stack>
                    <Typography display={"flex"} flexDirection={"row-reverse"}>{data.username ? data.username : "Failed to Retrieve Username"}</Typography>
                    <Typography display={"flex"} flexDirection={"row-reverse"}>{data.first_name} {data.last_name}</Typography>
                    <Typography display={"flex"} flexDirection={"row-reverse"}>{data.email ? data.email : ""}</Typography>
                </Stack>
            )
        } else {
            return (
                <Stack>
                    <Typography></Typography>
                </Stack>
            )
        }
    }

    const pageLoaded = () => {
        return (
            <Paper elevation={2} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                <Box  sx={{
                    display: 'grid',
                    width: '100%',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `
                        "avatar details details details details details"
                        "about about about about about about"
                        "groups groups groups groups groups groups"
                        "rooms rooms rooms rooms rooms rooms"
                        "equip equip equip equip equip equip"
                    `,
                    }}
                >
                    <Box sx={{ gridArea: 'avatar'}}>
                        <Avatar 
                            alt="User Image"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                            sx={{ width: 152, height: 152 }}
                        />
                    </Box>
                    <Box sx={{ gridArea: 'details' }}>
                        {dataLoaded()}
                    </Box>
                
                
                    <Box sx={{ gridArea: 'about'}}>
                        <Typography 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            bgcolor={'grey.A200'}
                            padding={"0.25rem"}
                            borderRadius={"0.25rem"}
                        >
                            About Me
                        </Typography>
                    </Box>
                    <Box sx={{ gridArea: 'groups'}}>
                        <Typography 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            bgcolor={'grey.A200'}
                            padding={"0.25rem"}
                            borderRadius={"0.25rem"}
                        >
                            Groups
                        </Typography>
                    </Box>
                    <Box sx={{ gridArea: 'rooms'}}>
                        <Typography 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            bgcolor={'grey.A200'}
                            padding={"0.25rem"}
                            borderRadius={"0.25rem"}
                        >
                            Rooms
                        </Typography>
                    </Box>
                    <Box sx={{ gridArea: 'equip'}}>
                        <Typography 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            bgcolor={'grey.A200'}
                            padding={"0.25rem"}
                            borderRadius={"0.25rem"}
                        >
                            Equipment
                        </Typography>
                    </Box>
                    
                </Box>

            </Paper>
        );
    };

    const pageLoadError = () => {
        return (
            <Paper>
                <Grid item xs={12}>
                    <Typography>Something went wrong.</Typography>
                </Grid>
            </Paper>
        );
    };

    // User Logged In Check
    if (!authData.logged_in && authData.init) {
        // console.log(authData);
        // console.log("User Not Logged In?");
        if (alertSetter) {
            alertSetter({open: true, content: "Please Login to Continue.", severity: "error"})
        };
        navigate('/');
    };

    if (reduxError) {
        return (
            <React.Fragment>
                {pageLoadError()}
            </React.Fragment>
        );
    } else if (isProcessing) {
        return (
            <React.Fragment>
                {pageLoading()}
            </React.Fragment>
        );
    } else if (!isProcessing) {
        return (
            <React.Fragment>
                {pageLoaded()}
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                {pageLoadError()}
            </React.Fragment>
        );
    };
};


const UserProfile = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();
    
    const params: any = useParams();
    
    const reduxPayload: UserProfileProps = useSelector((store: RootStateOrAny) => store?.redUser);
    useEffect(() => {
        dispatch(fetchUserProfile(params.username));
    }, [dispatch]);


    const data: ReturnUserObject = reduxPayload.user;
    const isProcessing = reduxPayload.isProcessing;
    const reduxError = reduxPayload.error ? reduxPayload.error : false;

    return (
        <Grid container spacing={2} justifyContent={'center'} width={'100%'}>
            <PageLoadHandler 
                authData={authData}
                navigate={navigate}
                alertSetter={alertSetter}
                data={data} 
                isProcessing={isProcessing} 
                reduxError={reduxError} 
            />
        </Grid>
    )
};

export default UserProfile;