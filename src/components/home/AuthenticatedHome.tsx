// React
import React, { useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Button,
    Typography
} from "@mui/material"

import {
    PrecisionManufacturing,
    Forum,
    Chat
} from '@mui/icons-material';

// Providers
import { authToken } from '../../providers/authProvider';

import HandleButtonClick from '../../utils/HandleButtonClick';

// Interface Imports
import { fetchGroupList } from '../../redux/actions/actGroupList';
import { fetchRoomList } from '../../redux/actions/actRoomList';


import GroupCardListHorizontal, { GroupListProps } from "../building_blocks/group/GroupCardListHorizontal";
import RoomCardListHorizontal, { RoomListProps } from "../building_blocks/room/RoomCardListHorizontal";


interface ReduxDataPayload {
    groups: GroupListProps
    rooms: RoomListProps
};


const HomePageHeader = () => {
    return (
        <React.Fragment>
            <Grid item container width={'100%'} margin={'0 0 2rem 0'}>
                <Grid item xs={12} flexDirection='column' display={'flex'} justifyContent={'center'}>
                    <Typography display={'flex'} variant='h2' align='center' color={'text.primary'} margin='0.25rem'>
                        What's New!
                    </Typography>
                    <Typography display={'flex'} variant='h6' align='center' color={'secondary.light'} margin='0.25rem'>
                        EDOM buildout is coming together!  Be on the lookout for alpha's of the Group, Equipment and Room Management Pages soon!
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container width={'100%'} margin={'0 0 2rem 0'}>
                <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                    <Button 
                        href='https://www.scuttlerobot.org/' 
                        variant="contained" 
                        startIcon={<PrecisionManufacturing />} 
                        onClick={HandleButtonClick}
                    >
                        SCUTTLE
                    </Button>
                </Grid>

                <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                    <Button 
                        href='https://discord.gg/8q6MFRcW79' 
                        variant="contained" 
                        startIcon={<Chat />}
                        onClick={HandleButtonClick}
                    >
                        Discord
                    </Button>
                </Grid>

                <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                    <Button disabled variant="contained" startIcon={<Forum />}>
                        Forums
                    </Button>
                </Grid>
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
                {HomePageHeader()}
                <Grid item container width={'100%'} margin={'2rem 0 0 0'}>
                    <Typography variant='h4' color={'text.primary'}>Featured Groups</Typography>
                </Grid>
                {GroupCardListHorizontal(navigate, "featured-groups", 3, reduxData.groups)}
                <Grid item container width={'100%'} margin={'2rem 0 0 0'}>
                    <Typography variant='h4' color={'text.primary'}>Featured Rooms</Typography>
                </Grid>
                {RoomCardListHorizontal(navigate, "featured-rooms", 3, reduxData.rooms)}
            </React.Fragment>
            
        );
    };


    // User Logged In Check
    if (!authData.logged_in && authData.init) {
        if (alertSetter) {
            alertSetter({open: true, content: "Please Login to Continue.", severity: "error"})
        };
    };

    return (
        <React.Fragment>
            {pageLoaded()}
        </React.Fragment>
    );
};


const AuthenticatedHome = (props: {authData: authToken, navigate: NavigateFunction, alertSetter: Function | undefined}) => {
    const { authData, navigate, alertSetter } = props; 

    // React / Redux Function Instantiations
    const dispatch = useDispatch();
    
    const reduxGroupList: GroupListProps = useSelector((store: RootStateOrAny) => store?.redGroupList);
    const reduxRoomList: RoomListProps = useSelector((store: RootStateOrAny) => store?.redRoomList);

    useEffect(() => {
        dispatch(fetchGroupList());
        dispatch(fetchRoomList());
    }, [dispatch]);

    const reduxData: ReduxDataPayload = {
        groups: reduxGroupList,
        rooms: reduxRoomList
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
}

export default AuthenticatedHome