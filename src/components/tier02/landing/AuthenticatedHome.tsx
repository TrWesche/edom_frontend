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
import { authToken } from '../../../providers/authProvider';

import { handleClickMouseEvent } from '../../../utils/clickHandlers';

// Component Imports
import CardList from '../../tier02/cardlist/CardList';

// Component Function Imports
import { buildEquipCardContentList, buildGroupCardContentList, buildRoomCardContentList } from "../../tier02/cardlist/CardListFunctions";

// Interface Imports
import { CardListProps, CardListRenderProps, GroupListProps, RoomListProps, EquipListProps } from '../../tier02/cardlist/CardListInterfaces';
import { CardSettingProps } from "../../tier03/cards/_interfaceCardProps";

// Redux Action Imports
import { fetchGroupList } from '../../../redux/actions/actGroupList';
import { fetchRoomList } from '../../../redux/actions/actRoomList';
import { fetchEquipList } from '../../../redux/actions/actEquipList';

const CardProps: CardListRenderProps = {
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

const CardSettings: CardSettingProps = {
    displayEdit: true,
    displayMedia: true,
    mediaHeight: 200,
    displayContent: true,
    contentHeight:  100,
    displayActions: false,
    actionHeight: 100,
    enableActionArea: true
};

interface ReduxDataPayload {
    group: CardListProps
    room: CardListProps
    equip: CardListProps
};


const HomePageHeader = (navigate: NavigateFunction) => {
    return (
        <Grid container item spacing={4} xs={12}>
            <Grid item container xs={12} margin={'0 0 2rem 0'}>
                <Grid item xs={12} flexDirection='column' display={'flex'} justifyContent={'center'}>
                    <Typography display={'flex'} variant='h2' align='center' color={'text.primary'} margin='0.25rem'>
                        What's New!
                    </Typography>
                    <Typography display={'flex'} variant='h6' align='center' color={'secondary.light'} margin='0.25rem'>
                        EDOM buildout is coming together!  Be on the lookout for alpha's of the Group, Equipment and Room Management Pages soon!
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container xs={12} margin={'0 0 2rem 0'}>
                <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                    <Button 
                        href='https://www.scuttlerobot.org/' 
                        variant="contained" 
                        startIcon={<PrecisionManufacturing />} 
                        onClick={(e) => handleClickMouseEvent(e, navigate, 'https://www.scuttlerobot.org/', true)}
                    >
                        SCUTTLE
                    </Button>
                </Grid>

                <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                    <Button 
                        href='https://discord.gg/8q6MFRcW79' 
                        variant="contained" 
                        startIcon={<Chat />}
                        onClick={(e) => handleClickMouseEvent(e, navigate, 'https://discord.gg/8q6MFRcW79', true)}
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
        </Grid>
    )
};


const PageLoadHandler = (props: {
        authData: authToken,
        navigate: NavigateFunction,
        alertSetter: Function | undefined, 
        renderData: ReduxDataPayload}) => {
    const { authData, navigate, alertSetter, renderData } = props; 
    const {group, room, equip} = renderData;

    const pageLoaded = () => {
        return (
            <React.Fragment>
                {HomePageHeader(navigate)}
                <Grid item xs={12} margin={"20px 0 0 0"}>
                    <Typography variant='h2' color={'text.primary'}>Featured Groups</Typography>
                </Grid>
                <CardList 
                    listid={group.listid}
                    cardType={group.cardType}
                    navigate={group.navigate}
                    cardContent={group.cardContent}
                    renderConfig={group.renderConfig}
                    displayIsProcessing={group.displayIsProcessing}
                    displayError={group.displayError}
                />
                <Grid item xs={12} margin={"20px 0 0 0"}>
                    <Typography variant='h2' color={'text.primary'}>Featured Rooms</Typography>
                </Grid>
                <CardList 
                    listid={room.listid}
                    cardType={room.cardType}
                    navigate={room.navigate}
                    cardContent={room.cardContent}
                    renderConfig={room.renderConfig}
                    displayIsProcessing={room.displayIsProcessing}
                    displayError={room.displayError}
                />
                <Grid item xs={12} margin={"20px 0 0 0"}>
                    <Typography variant='h2' color={'text.primary'}>Featured Equipment</Typography>
                </Grid>
                <CardList 
                    listid={equip.listid}
                    cardType={equip.cardType}
                    navigate={equip.navigate}
                    cardContent={equip.cardContent}
                    renderConfig={equip.renderConfig}
                    displayIsProcessing={equip.displayIsProcessing}
                    displayError={equip.displayError}
                />
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
    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);

    const groupCardContentList = buildGroupCardContentList(CardSettings, reduxGroupList);
    const roomCardContentList = buildRoomCardContentList(CardSettings, reduxRoomList);
    const equipCardContentList = buildEquipCardContentList(CardSettings, reduxEquipList);

    const groupCardListData: CardListProps = {
        listid: `featured-group-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: groupCardContentList,
        renderConfig: CardProps,
        displayIsProcessing: reduxGroupList.isProcessing,
        displayError: reduxGroupList.error
    };

    const roomCardListData: CardListProps = {
        listid: `featured-room-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: roomCardContentList,
        renderConfig: CardProps,
        displayIsProcessing: reduxRoomList.isProcessing,
        displayError: reduxRoomList.error
    };

    const equipCardListData: CardListProps = {
        listid: `featured-equip-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: equipCardContentList,
        renderConfig: CardProps,
        displayIsProcessing: reduxEquipList.isProcessing,
        displayError: reduxEquipList.error
    };

    useEffect(() => {
        dispatch(fetchGroupList());
        dispatch(fetchRoomList());
        dispatch(fetchEquipList());
    }, [dispatch]);

    const renderData: ReduxDataPayload = {
        group: groupCardListData,
        room: roomCardListData,
        equip: equipCardListData
    };

    return (
        <PageLoadHandler 
            authData={authData}
            navigate={navigate}
            alertSetter={alertSetter}
            renderData={renderData}
        />
    )
}

export default AuthenticatedHome