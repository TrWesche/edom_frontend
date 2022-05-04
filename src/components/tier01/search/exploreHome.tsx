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
import { authToken, useAuth } from '../../../providers/authProvider';
import { useAlert } from '../../../providers/alertProvider';

// Component Imports
import CardList from '../../tier02/cardlist/CardList';

// Interface Imports
import { CardListProps, CardListRenderProps, GroupListProps, RoomListProps, EquipListProps } from '../../tier02/cardlist/CardListInterfaces';

// Redux Action Imports
import { fetchGroupList } from '../../../redux/actions/actGroupList';
import { fetchRoomList } from '../../../redux/actions/actRoomList';
import { fetchEquipList } from '../../../redux/actions/actEquipList';


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

interface ReduxDataPayload {
    group: CardListProps
    room: CardListProps
    equip: CardListProps
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


const ExploreHomeHeader = (props: {navigate: NavigateFunction}) => {
    const {navigate} =  props;
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
        renderData: ReduxDataPayload}) => {
    const { authData, navigate, alertSetter, renderData } = props; 
    const {group, room, equip} = renderData;

    const pageLoaded = () => {
        return (
            <Grid container spacing={5} justifyContent={'center'} width={'100%'}>
                <ExploreHomeHeader navigate={navigate} />
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

    const groupCardContentList = buildGroupContentList(reduxGroupList);
    const roomCardContentList = buildRoomContentList(reduxRoomList);
    const equipCardContentList = buildEquipContentList(reduxEquipList);

    const groupCardListData: CardListProps = {
        listid: `explore-group-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: groupCardContentList,
        renderConfig: CardRenderProps,
        displayIsProcessing: reduxGroupList.isProcessing,
        displayError: reduxGroupList.error
    };

    const roomCardListData: CardListProps = {
        listid: `explore-room-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: roomCardContentList,
        renderConfig: CardRenderProps,
        displayIsProcessing: reduxRoomList.isProcessing,
        displayError: reduxRoomList.error
    };

    const equipCardListData: CardListProps = {
        listid: `explore-equip-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: equipCardContentList,
        renderConfig: CardRenderProps,
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

export default ExploreHome;


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