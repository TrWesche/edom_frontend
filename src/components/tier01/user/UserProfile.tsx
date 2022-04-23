// React Imports
import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI Styling System Imports
import { Avatar, Skeleton, Stack } from '@mui/material'

import {
    Grid,
    Typography,
    Paper,
    IconButton,
    Box
} from "@mui/material";

import {
    Edit as EditIcon
} from "@mui/icons-material"

// Provider Imports
import { useAlert } from '../../../providers/alertProvider';
import { authToken, useAuth } from '../../../providers/authProvider';

// Typescript Interface Imports
import { ReturnUserObject } from '../../../interfaces/edomUserInterfaces';

// Redux Action Imports
import { fetchUserProfile } from '../../../redux/actions/actUser';
import { fetchGroupListUser } from '../../../redux/actions/actGroupList';
import { fetchRoomListUser } from '../../../redux/actions/actRoomList';
import { fetchEquipListUser } from '../../../redux/actions/actEquipList';

// Component Imports
import GroupCardListHorizontal, { GroupListProps } from "../../tier02/cardlist/GroupCardListHorizontal";
import RoomCardListHorizontal, { RoomListProps } from "../../tier02/cardlist/RoomCardListHorizontal";
import EquipCardListHorizontal, { EquipListProps } from '../../tier02/cardlist/EquipCardListHorizontal';


// TODO: This will need to have a Private / Public Component
interface UserProfileProps {
    user: ReturnUserObject
    isProcessing: boolean
    error?: boolean
};

interface UserOwnedObjectsProps {
    groups: GroupListProps
    rooms: RoomListProps
    equips: EquipListProps
};


const PageLoadHandler = (props: {
    authData: authToken, 
    navigate: NavigateFunction, 
    alertSetter: Function | undefined, 
    data: ReturnUserObject, 
    ownedObjects: UserOwnedObjectsProps, 
    isProcessing: boolean, 
    reduxError: boolean
}) => {
    const { authData, navigate, alertSetter, data, isProcessing, reduxError, ownedObjects } = props; 

    const pageLoading = () => {
        return (
            <Paper elevation={3} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                <Grid container item spacing={8} xs={12}>
                    <Grid item container spacing={2} xs={12}>
                        <Grid item xs={12} sm={6} md={4} lg={2} xl={1} display={'flex'} justifyContent={'flex-start'}>
                            <Skeleton variant="circular" width={152} height={152} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} lg={10} xl={11} display={'flex'} justifyContent={'flex-end'}>
                            <Skeleton variant="rectangular" height={152} />
                        </Grid>
                    </Grid>

                    <Grid item container spacing={2} xs={12}>
                        <Skeleton variant="rectangular" height={400} />
                    </Grid>
                </Grid>
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
                    <Typography display={"flex"} flexDirection={"row-reverse"}>{data.location ? data.location : ""}</Typography>
                    { data.id === authData.id ? 
                        <Box display={"flex"} justifyContent={"flex-end"}>
                            <IconButton aria-label="edit-profile" sx={{justifyContent:"flex-end", color: "primary.light"}}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                        :
                        <React.Fragment />
                    }
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
            <React.Fragment>
                <Paper elevation={3} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                    <Grid container item spacing={8} xs={12}>
                        <Grid item container spacing={2} xs={12}>
                            <Grid item xs={12} sm={6} md={4} lg={2} xl={1} display={'flex'} justifyContent={'flex-start'}>
                                <Avatar 
                                    alt="User Image"
                                    src={`${data.image_url ? data.image_url : "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png"}`}
                                    sx={{ width: 152, height: 152 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={8} lg={10} xl={11} display={'flex'} justifyContent={'flex-end'}>
                                {dataLoaded()}
                            </Grid>
                        </Grid>


                        <Grid item container spacing={2} xs={12}>
                            { data.headline && data.headline.length !== 0 ?
                                <Grid item xs={12}>
                                    <Typography
                                        variant='h5'
                                        margin={'0 0 10px 0'}
                                    >
                                        {data.headline}
                                    </Typography>
                                </Grid>
                                :
                                <React.Fragment />
                            }


                            { data.about && data.about.length !== 0 ?
                                <React.Fragment>
                                    <Grid item xs={12}>
                                        <Typography 
                                            color={'primary.light'} 
                                            variant='h5' 
                                            padding={"0.25rem"}
                                            borderRadius={"0.25rem"}
                                        >
                                            About
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant='body1'
                                        >
                                            {data.about}
                                        </Typography>
                                    </Grid>
                                </React.Fragment>
                                :
                                <React.Fragment />
                            }
                        
                        </Grid>
                    </Grid>
                </Paper>


                <Paper elevation={3} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                    <Grid container item spacing={8} xs={12}>
                        <Grid item container spacing={2} xs={12}>
                            <Grid item xs={12}>
                                <Typography 
                                    color={'primary.light'} 
                                    variant='h5' 
                                    padding={"0.25rem"}
                                    borderRadius={"0.25rem"}
                                >
                                    Groups
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {GroupCardListHorizontal(navigate, `${data.username_clean}-groups`, 4, ownedObjects.groups)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={3} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                    <Grid container item spacing={8} xs={12}>
                        <Grid item container spacing={2} xs={12}>
                            <Grid item xs={12}>
                                <Typography 
                                    color={'primary.light'} 
                                    variant='h5' 
                                    padding={"0.25rem"}
                                    borderRadius={"0.25rem"}
                                >
                                    Hubs
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {RoomCardListHorizontal(navigate, `${data.username_clean}-rooms`, 4, ownedObjects.rooms)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={3} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                    <Grid container item spacing={8} xs={12}>
                        <Grid item container spacing={2} xs={12}>
                            <Grid item xs={12}>
                                <Typography 
                                    color={'primary.light'} 
                                    variant='h5' 
                                    padding={"0.25rem"}
                                    borderRadius={"0.25rem"}
                                >
                                    Equipment
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {EquipCardListHorizontal(navigate, `${data.username_clean}-equip`, 4, ownedObjects.equips)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    };

    const pageLoadError = () => {
        return (
            <Grid item xs={12}>
                <Typography>Something went wrong.</Typography>
            </Grid>
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

    const reduxGroupList: GroupListProps = useSelector((store: RootStateOrAny) => store?.redGroupList);
    const reduxRoomList: RoomListProps = useSelector((store: RootStateOrAny) => store?.redRoomList);
    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);

    useEffect(() => {
        dispatch(fetchUserProfile(params.username));
        dispatch(fetchGroupListUser(params.username));
        dispatch(fetchRoomListUser(params.username));
        dispatch(fetchEquipListUser(params.username));
    }, [dispatch, params.username]);

    const ownedObjects: UserOwnedObjectsProps = {
        groups: reduxGroupList,
        rooms: reduxRoomList,
        equips: reduxEquipList
    };

    const data: ReturnUserObject = reduxPayload.user;
    const isProcessing = reduxPayload.isProcessing || reduxPayload.user === undefined;
    const reduxError = reduxPayload.error ? reduxPayload.error : false;

    return (
        <Grid container spacing={2} justifyContent={'center'} margin={"30px 0"}>
            <PageLoadHandler 
                authData={authData}
                navigate={navigate}
                alertSetter={alertSetter}
                data={data} 
                ownedObjects={ownedObjects}
                isProcessing={isProcessing} 
                reduxError={reduxError} 
            />
        </Grid>
    )
};

export default UserProfile;