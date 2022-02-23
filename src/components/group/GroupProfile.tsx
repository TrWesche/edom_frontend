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
    Avatar
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


interface ReduxDataPayload {
    group: GroupObjectProps
    // users: UserListProps
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


const GroupProfileHeader = (navigate: NavigateFunction) => {
    return (
        <React.Fragment>
            <Grid item container width={'100%'}>
                <Box>
                    <Avatar 
                        alt="User Image"
                        src="https://th.bing.com/th/id/OIP.V4WfwwbPOAKnHebgSFbmNwHaGL?pid=ImgDet&rs=1"
                        sx={{ width: 152, height: 152 }}
                    />
                </Box>

                <Box>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        bgcolor={'grey.A200'}
                        padding={"0.25rem"}
                        borderRadius={"0.25rem"}
                    >
                        Group Name
                    </Typography>
                </Box>

                <Box>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        bgcolor={'grey.A200'}
                        padding={"0.25rem"}
                        borderRadius={"0.25rem"}
                    >
                        Group Location
                    </Typography>
                </Box>

                <Box>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        bgcolor={'grey.A200'}
                        padding={"0.25rem"}
                        borderRadius={"0.25rem"}
                    >
                        Group Headline
                    </Typography>
                </Box>

                <Box>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        bgcolor={'grey.A200'}
                        padding={"0.25rem"}
                        borderRadius={"0.25rem"}
                    >
                        Group Description
                    </Typography>
                </Box>
            </Grid>
        </React.Fragment>
    )
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
                {GroupProfileHeader(navigate)}
                <Grid item container width={'100%'} margin={'2rem 0 0 0'}>
                    <Typography variant='h4' color={'text.primary'}>Group Users</Typography>
                </Grid>
                {/* {UserCardListHorizontal("group-users", 4, reduxData.users)} */}
                <Grid item container width={'100%'} margin={'2rem 0 0 0'}>
                    <Typography variant='h4' color={'text.primary'}>Group Rooms</Typography>
                </Grid>
                {RoomCardListHorizontal("group-equip", 4, reduxData.rooms)}
                <Grid item container width={'100%'} margin={'2rem 0 0 0'}>
                    <Typography variant='h4' color={'text.primary'}>Group Equip</Typography>
                </Grid>
                {EquipCardListHorizontal("group-equip", 4, reduxData.equips)}
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
    // const reduxUserList: UserListProps = useSelector((store: RootStateOrAny) => store?.redUserList);
    const reduxRoomList: RoomListProps = useSelector((store: RootStateOrAny) => store?.redRoomList);
    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);


    useEffect(() => {
        dispatch(fetchGroupProfile(params.groupID, authData));
        // dispatch(fetchUserListGroup(params.groupID));
        dispatch(fetchRoomListGroup(params.groupID));
        dispatch(fetchEquipListGroup(params.groupID));
    }, [dispatch]);

    const reduxData: ReduxDataPayload = {
        group: reduxGroup,
        // users: reduxUserList,
        rooms: reduxRoomList,
        equips: reduxEquipList
    };

    return (
        <Grid container spacing={2} justifyContent={'center'} width={'100%'}>
            <PageLoadHandler 
                authData={authData}
                navigate={navigate}
                alertSetter={alertSetter}
                reduxData={reduxData}
            />
        </Grid>
    )
};

export default GroupProfile;