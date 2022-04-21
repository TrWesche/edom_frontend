// React
import React, { useEffect, MouseEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent
} from "@mui/material"


// Providers
import { authToken, useAuth } from '../../providers/authProvider';
import { useAlert } from '../../providers/alertProvider';

// Interface Imports
import GroupCardListHorizontal, { GroupListProps } from "../building_blocks/group/GroupCardListHorizontal";
import RoomCardListHorizontal, { RoomListProps } from "../building_blocks/room/RoomCardListHorizontal";
import EquipCardListHorizontal, { EquipListProps } from '../building_blocks/equip/EquipCardListHorizontal';

// Redux Actions
import { fetchGroupList } from '../../redux/actions/actGroupList';
import { fetchRoomList } from '../../redux/actions/actRoomList';
import { fetchEquipList } from '../../redux/actions/actEquipList';


interface ReduxDataPayload {
    groups: GroupListProps
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


const ExploreHomeHeader = (navigate: NavigateFunction) => {
    return (
        <Grid container item spacing={4} xs={12}>
            <Grid item xs={12}>
                <Typography variant='h1' color={'text.primary'}>Explore</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ flexGrow: 1 }}>
                    <CardActionArea onClick={(e) => handleClick(e, navigate, '/groups')}>
                        <CardMedia
                            component="img"
                            height="50"
                            src="https://mediationnorthernireland.org/app/uploads/2016/07/staff_white.png"
                            alt="Explore Groups"
                            sx={{
                                objectFit: 'scale-down',
                                maxWidth: '50px',
                                margin: '10px'
                            }}
                        />
                        <CardContent
                            sx={{
                                height: '70px',
                                textOverflow: 'ellipsis',
                                textAlign: 'left'
                            }}
                        >
                            <Typography variant="h4" component="div">
                                Groups
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ flexGrow: 1 }}>
                    <CardActionArea onClick={(e) => handleClick(e, navigate, '/rooms')}>
                        <CardMedia
                            component="img"
                            height="50"
                            src="https://www.pinclipart.com/picdir/big/178-1785162_white-home-icon-png-vector-royalty-free-download.png"
                            alt="Explore Rooms"
                            sx={{
                                objectFit: 'scale-down',
                                maxWidth: '50px',
                                margin: '10px'
                            }}
                        />
                        <CardContent
                            sx={{
                                height: '70px',
                                textOverflow: 'ellipsis',
                                textAlign: 'left'
                            }}
                        >
                            <Typography gutterBottom variant="h4" component="div">
                                Rooms
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ flexGrow: 1 }}>
                    <CardActionArea onClick={(e) => handleClick(e, navigate, '/equip')}>
                        <CardMedia
                            component="img"
                            height="50"
                            src="https://www.flaticon.com/premium-icon/icons/svg/690/690887.svg"
                            alt="Explore Equip"
                            sx={{
                                objectFit: 'scale-down',
                                maxWidth: '50px',
                                margin: '10px'
                            }}
                        />
                        <CardContent
                            sx={{
                                height: '70px',
                                textOverflow: 'ellipsis',
                                textAlign: 'left'
                            }}
                        >
                            <Typography gutterBottom variant="h4" component="div">
                                Equip
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>   
            </Grid>
        </Grid>
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
            <Grid container spacing={5} justifyContent={'center'} width={'100%'}>
                {ExploreHomeHeader(navigate)}
                <Grid item xs={12} margin={"20px 0 0 0"}>
                    <Typography variant='h2' color={'text.primary'}>Featured Groups</Typography>
                </Grid>
                {GroupCardListHorizontal(navigate, "featured-groups", 6, reduxData.groups)}
                <Grid item xs={12} margin={"20px 0 0 0"}>
                    <Typography variant='h2' color={'text.primary'}>Featured Rooms</Typography>
                </Grid>
                {RoomCardListHorizontal(navigate, "featured-rooms", 6, reduxData.rooms)}
                <Grid item xs={12} margin={"20px 0 0 0"}>
                    <Typography variant='h2' color={'text.primary'}>Featured Equipment</Typography>
                </Grid>
                {EquipCardListHorizontal(navigate, "featured-equips", 6, reduxData.equips)}
                <Grid item xs={12} margin={"20px 0 0 0"}>
                    <Typography variant='h2' color={'text.primary'}>Featured Users</Typography>
                </Grid>
            </Grid>
            
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


const ExploreHome = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();


    // React / Redux Function Instantiations
    const dispatch = useDispatch();
    
    const reduxGroupList: GroupListProps = useSelector((store: RootStateOrAny) => store?.redGroupList);
    const reduxRoomList: RoomListProps = useSelector((store: RootStateOrAny) => store?.redRoomList);
    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);


    useEffect(() => {
        dispatch(fetchGroupList());
        dispatch(fetchRoomList());
        dispatch(fetchEquipList());
    }, [dispatch]);

    const reduxData: ReduxDataPayload = {
        groups: reduxGroupList,
        rooms: reduxRoomList,
        equips: reduxEquipList
    };

    return (
        <PageLoadHandler 
            authData={authData}
            navigate={navigate}
            alertSetter={alertSetter}
            reduxData={reduxData}
        />
    )
}

export default ExploreHome;