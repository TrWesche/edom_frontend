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
import CardList from '../../tier02/cardlist/CardList';

// Interface Imports
import { CardListProps, CardListRenderProps, GroupListProps, RoomListProps, EquipListProps } from '../../tier02/cardlist/CardListInterfaces';

const CardRenderProps: CardListRenderProps = {
    xlRows: 1,
    lgRows: 1,
    mdRows: 2,
    smRows: 3,
    xsRows: 6,
    xlColumns: 4,
    lgColumns: 4,
    mdColumns: 3,
    smColumns: 2,
    xsColumns: 1
};

// TODO: This will need to have a Private / Public Component
interface UserProfileProps {
    user: ReturnUserObject
    isProcessing: boolean
    error?: boolean
};

interface UserObjectProps {
    group: CardListProps
    room: CardListProps
    equip: CardListProps
};


const PageLoadHandler = (props: {
    authData: authToken, 
    navigate: NavigateFunction, 
    alertSetter: Function | undefined, 
    data: ReturnUserObject, 
    userObjects: UserObjectProps, 
    isProcessing: boolean, 
    reduxError: boolean
}) => {
    const { authData, navigate, alertSetter, data, isProcessing, reduxError, userObjects } = props; 
    const { group, room, equip } = userObjects;


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
                                <CardList 
                                    listid={group.listid}
                                    cardType={group.cardType}
                                    navigate={group.navigate}
                                    cardContent={group.cardContent}
                                    renderConfig={group.renderConfig}
                                    displayIsProcessing={group.displayIsProcessing}
                                    displayError={group.displayError}
                                />
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
                                <CardList 
                                    listid={room.listid}
                                    cardType={room.cardType}
                                    navigate={room.navigate}
                                    cardContent={room.cardContent}
                                    renderConfig={room.renderConfig}
                                    displayIsProcessing={room.displayIsProcessing}
                                    displayError={room.displayError}
                                />
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
                                <CardList 
                                    listid={equip.listid}
                                    cardType={equip.cardType}
                                    navigate={equip.navigate}
                                    cardContent={equip.cardContent}
                                    renderConfig={equip.renderConfig}
                                    displayIsProcessing={equip.displayIsProcessing}
                                    displayError={equip.displayError}
                                />
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

    const groupCardContentList = buildGroupContentList(reduxGroupList);
    const roomCardContentList = buildRoomContentList(reduxRoomList);
    const equipCardContentList = buildEquipContentList(reduxEquipList);

    const groupCardListData: CardListProps = {
        listid: `${authData.username}-group-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: groupCardContentList,
        renderConfig: CardRenderProps,
        displayIsProcessing: reduxGroupList.isProcessing,
        displayError: reduxGroupList.error
    };

    const roomCardListData: CardListProps = {
        listid: `${authData.username}-room-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: roomCardContentList,
        renderConfig: CardRenderProps,
        displayIsProcessing: reduxRoomList.isProcessing,
        displayError: reduxRoomList.error
    };

    const equipCardListData: CardListProps = {
        listid: `${authData.username}-equip-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: equipCardContentList,
        renderConfig: CardRenderProps,
        displayIsProcessing: reduxEquipList.isProcessing,
        displayError: reduxEquipList.error
    };

    useEffect(() => {
        dispatch(fetchUserProfile(params.username));
        dispatch(fetchGroupListUser(params.username));
        dispatch(fetchRoomListUser(params.username));
        dispatch(fetchEquipListUser(params.username));
    }, [dispatch, params.username]);

    const userObjects: UserObjectProps = {
        group: groupCardListData,
        room: roomCardListData,
        equip: equipCardListData
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
                userObjects={userObjects}
                isProcessing={isProcessing} 
                reduxError={reduxError} 
            />
        </Grid>
    )
};

export default UserProfile;




const buildEquipContentList = (data: EquipListProps ) => {
    const retList: any = [];
    if (!data.equip) {
        return retList;
    }
    data.equip.forEach(element => {
        retList.push({
            settings: {
                displayEdit: true,
                displayMedia: true,
                mediaHeight: 200,
                // mediaWidth: 200,
                displayContent: true,
                contentHeight:  100,
                displayActions: false,
                actionHeight: 100,
                enableActionArea: true
            },
            data: {
                editAllowed: element.edit_permissions || false,
                editButtonDestination: `/equip/${element.id}` || `#`,
                actionAreaDestination: `/equip/${element.id}` || `#`,
                mediaURI: element.image_url || `Image Not Found`,
                mediaAltText: "TODO - Alt Text Not Stored",
                contentTexts: [
                    {textVariant: "h5", textContent: element.name}, 
                    {textVariant: "body2", textContent: element.headline}, 
                    // {textVariant: "body2", textContent: element.description}
                ]
            }
        })
    });

    return retList;
};


const buildRoomContentList = (data: RoomListProps ) => {
    const retList: any = [];
    if (!data.rooms) {
        return retList;
    }
    data.rooms.forEach(element => {
        retList.push({
            settings: {
                displayEdit: true,
                displayMedia: true,
                mediaHeight: 200,
                // mediaWidth: 200,
                displayContent: true,
                contentHeight:  100,
                displayActions: false,
                actionHeight: 100,
                enableActionArea: true
            },
            data: {
                editAllowed: element.edit_permissions || false,
                editButtonDestination: `/rooms/${element.id}` || `#`,
                actionAreaDestination: `/rooms/${element.id}` || `#`,
                mediaURI: element.image_url || `Image Not Found`,
                mediaAltText: "TODO - Alt Text Not Stored",
                contentTexts: [
                    {textVariant: "h5", textContent: element.name}, 
                    {textVariant: "body2", textContent: element.headline}, 
                    // {textVariant: "body2", textContent: element.description}
                ]
            }
        })
    });

    return retList;
};


const buildGroupContentList = (data: GroupListProps ) => {
    const retList: any = [];
    if (!data.group) {
        return retList;
    }
    data.group.forEach(element => {
        retList.push({
            settings: {
                displayEdit: true,
                displayMedia: true,
                mediaHeight: 200,
                // mediaWidth: 200,
                displayContent: true,
                contentHeight:  100,
                displayActions: false,
                actionHeight: 100,
                enableActionArea: true
            },
            data: {
                editAllowed: element.edit_permissions || false,
                editButtonDestination: `/groups/${element.id}` || `#`,
                actionAreaDestination: `/groups/${element.id}` || `#`,
                mediaURI: element.image_url || `Image Not Found`,
                mediaAltText: "TODO - Alt Text Not Stored",
                contentTexts: [
                    {textVariant: "h5", textContent: element.name}, 
                    {textVariant: "body2", textContent: element.headline}, 
                    // {textVariant: "body2", textContent: element.description}
                ]
            }
        })
    });

    return retList;
};