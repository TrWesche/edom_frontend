// React
import React, { useEffect, MouseEvent } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Box,
    Avatar,
    Paper
} from "@mui/material"


// Providers
import { authToken, useAuth } from '../../providers/authProvider';
import { useAlert } from '../../providers/alertProvider';

// Interface Imports
import EquipCardListHorizontal, { EquipListProps } from '../building_blocks/equip/EquipCardListHorizontal';
import {  fetchEquipListGroup } from '../../redux/actions/actEquipList';
import { GroupObjectProps } from '../../interfaces/globalInterfaces';
import { fetchGroupProfile } from '../../redux/actions/actGroup';
import { fetchRoomListGroup } from '../../redux/actions/actRoomList';
import { fetchUserListGroup } from '../../redux/actions/actUserList';
import RoomCardListHorizontal, { RoomListProps } from '../building_blocks/room/RoomCardListHorizontal';
import UserCardListHorizontal, { UserListProps } from '../building_blocks/users/UserCardListHorizontal';


interface ReduxDataPayload {
    group: GroupObjectProps
    users: UserListProps
    rooms: RoomListProps
    equips: EquipListProps
};


interface ClickEvent extends MouseEvent<HTMLButtonElement> {
    target: ClickTarget
};

interface ClickTarget extends EventTarget {
    href?: string
};

const handleClick = (e: ClickEvent, navigate: NavigateFunction, target: string) => {
    e.preventDefault();
    // console.log(`Clicked: ${target}`)
    if (target !== "") {
        navigate(target);
    } else {
        console.log("Error, destination not defined")
    }
};

const GroupProfileHeader = (navigate: NavigateFunction, data: GroupObjectProps) => {
    return (
        <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={3}>
                    <Avatar 
                        alt="User Image"
                        src={data.image ? data.image : `https://th.bing.com/th/id/OIP.V4WfwwbPOAKnHebgSFbmNwHaGL?pid=ImgDet&rs=1`} 
                        sx={{ width: 152, height: 152 }}
                    />
                </Grid>

                <Grid item xs={9} justifyContent={'end'}>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        padding={"0.25rem"}
                        textAlign={"right"}
                    >
                        {data.name}
                    </Typography>

                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        padding={"0.25rem"}
                        textAlign={"right"}
                    >
                        Group Location
                    </Typography>
                </Grid>

                {/* <Grid item width={'100%'}>
                    <Typography 
                        color={'primary.light'} 
                        variant='h6' 
                        margin={"1.5rem 0rem 0rem 0rem"}
                        padding={"0.25rem"}
                    >
                        Building the future of logistics.
                    </Typography>
                </Grid> 

                <Grid item width={'100%'}>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        padding={"0 0.25rem"}
                        textAlign={"left"}
                    >
                        About
                    </Typography>
                </Grid>

                <Grid item width={'100%'}>
                    <Typography 
                        color={'secondary.light'} 
                        variant='body1' 
                        margin={"0rem 0rem 0rem 0rem"}
                        padding={"0 0.25rem 0.25rem 0.25rem"}
                    >
                        Founded in 2020 we we have been moving quickly to bring the latest and greatest technology to the logistics space.
                    </Typography>
                </Grid> */}

                {data.headline ? 
                    <Grid item xs={12}>
                        <Typography 
                            color={'primary.light'} 
                            variant='h6' 
                            margin={"1.5rem 0rem 0rem 0rem"}
                            padding={"0.25rem"}
                        >
                            {data.headline}
                        </Typography>
                    </Grid> 
                    :
                    <React.Fragment></React.Fragment>
                }

                {data.description ? 
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography 
                                color={'secondary.dark'} 
                                variant='h5' 
                                margin={"1rem 0rem 0rem 0rem"}
                                padding={"0 0.25rem"}
                                textAlign={"left"}
                            >
                                About
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography 
                                color={'secondary.light'} 
                                variant='body1' 
                                margin={"0rem 0rem 0rem 0rem"}
                                padding={"0 0.25rem 0.25rem 0.25rem"}
                            >
                                {data.description}
                            </Typography>
                        </Grid>
                    </React.Fragment>
                    :
                    <React.Fragment></React.Fragment>
                }
            </Grid>
        </Paper>
    )
};

const GroupUserSection = (navigate: NavigateFunction, data: UserListProps) => {
    if (data && data.users && data.users.length !== 0) {
        return (
            <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant='h4' color={'text.primary'}>Group Equip</Typography>
                </Grid>
                <Grid item container xs={12} margin={"1rem 0rem 0rem 0rem"}>
                    {UserCardListHorizontal(navigate, "group-equip", 4, data)}
                </Grid>
            </Grid>
        </Paper>
        )
    } 
};

const GroupRoomSection = (navigate: NavigateFunction, data: RoomListProps) => {
    if (data && data.rooms && data.rooms.length !== 0) {
        return (
            <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
                <Grid item container xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h4' color={'text.primary'}>Group Rooms</Typography>
                    </Grid>
                    <Grid item container xs={12} margin={"1rem 0rem 0rem 0rem"}>
                        {RoomCardListHorizontal(navigate, "group-rooms", 4, data)}
                    </Grid>
                </Grid>
            </Paper>
        )
    }
};

const GroupEquipSection = (navigate: NavigateFunction, data: EquipListProps) => {
    if (data && data.equip && data.equip.length !== 0) {
        return (
            <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant='h4' color={'text.primary'}>Group Equip</Typography>
                </Grid>
                <Grid item container xs={12} margin={"1rem 0rem 0rem 0rem"}>
                    {EquipCardListHorizontal(navigate, "group-equip", 4, data)}
                </Grid>
            </Grid>
        </Paper>
        )
    } 
};

const PageLoadHandler = (props: {
    authData: authToken, 
    navigate: NavigateFunction,
    alertSetter: Function | undefined, 
    reduxData: ReduxDataPayload}) => {
    const { authData, navigate, alertSetter, reduxData } = props; 


    const pageLoaded = () => {
        return (
            <React.Fragment> 
                {GroupProfileHeader(navigate, reduxData.group)}
                {GroupUserSection(navigate, reduxData.users)}
                {GroupRoomSection(navigate, reduxData.rooms)}
                {GroupEquipSection(navigate, reduxData.equips)}
            </React.Fragment>
            
        );
    };


    // User Logged In Check
    if (!authData.logged_in && authData.init) {
        if (alertSetter) {
            alertSetter({open: true, content: "Please Login to Continue.", severity: "error"})
        };
        navigate('/');
    };

    return (
        <React.Fragment>
            {pageLoaded()}
        </React.Fragment>
    );
};



const GroupProfile = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();

    const params: any = useParams();

    // React / Redux Function Instantiations
    const dispatch = useDispatch();

    const reduxGroup: GroupObjectProps = useSelector((store: RootStateOrAny) => store?.redGroup);
    const reduxUserList: UserListProps = useSelector((store: RootStateOrAny) => store?.redUserList);
    const reduxRoomList: RoomListProps = useSelector((store: RootStateOrAny) => store?.redRoomList);
    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);


    useEffect(() => {
        dispatch(fetchGroupProfile(params.groupID, authData));
        dispatch(fetchUserListGroup(params.groupID));
        dispatch(fetchRoomListGroup(params.groupID));
        dispatch(fetchEquipListGroup(params.groupID));
    }, [dispatch]);

    const reduxData: ReduxDataPayload = {
        group: reduxGroup,
        users: reduxUserList,
        rooms: reduxRoomList,
        equips: reduxEquipList
    };

    return (
        <Grid container spacing={2} justifyContent={'center'} width={'100%'}>
            <Grid item container justifyContent={'center'} maxWidth={'1200px'}>
                <PageLoadHandler 
                    authData={authData}
                    navigate={navigate}
                    alertSetter={alertSetter}
                    reduxData={reduxData}
                />
            </Grid>
        </Grid>
    )
};

export default GroupProfile;