// React
import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Typography,
    Avatar,
    Paper,
    Divider,
    Button,
    Link
} from "@mui/material"


// Providers
import { authToken, useAuth } from '../../../providers/authProvider';
import { useAlert } from '../../../providers/alertProvider';

// Interface Imports
import { EquipListProps } from '../../tier02/cardlist/EquipCardListHorizontal';
import { ReturnRoomObject } from '../../../interfaces/edomRoomInterfaces';
import { fetchRoomProfile } from '../../../redux/actions/actRoom';
import { fetchEquipListRoom } from '../../../redux/actions/actEquipList';
import CardList, { CardListProps } from '../../tier02/cardlist/CardList';


const EquipDirectoryCardProps = {
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
    Room: ReturnRoomObject
    Equip: CardListProps
};


const handleClick = (e: React.MouseEvent, navigate: NavigateFunction, target: string) => {
    e.preventDefault();
    // console.log(`Clicked: ${target}`)
    if (target !== "") {
        navigate(target);
    } else {
        console.log("Error, destination not defined")
    }
};

const RoomProfileHeader = (props: {
    navigate: NavigateFunction,
    data: ReturnRoomObject}) => 
{
    const {navigate, data} = props;
    return (
        <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={3}>
                    <Avatar 
                        alt="Room Image"
                        src={data.image_url ? data.image_url : `https://th.bing.com/th/id/OIP.V4WfwwbPOAKnHebgSFbmNwHaGL?pid=ImgDet&rs=1`} 
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
                        {data.category}
                    </Typography>

                    {data.owner_group ? 
                        <Link 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            padding={"0.25rem"}
                            textAlign={"right"}
                            onClick={(e) => handleClick(e, navigate, `/groups/${data.owner_group ? data.owner_group.group_id : "404"}`)}
                        >
                            {data.owner_group.group_name}
                        </Link>
                        :
                        <React.Fragment></React.Fragment>
                    }


                    {data.owner_user ? 
                        <Link 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            padding={"0.25rem"}
                            textAlign={"right"}
                            onClick={(e) => handleClick(e, navigate, `/users/${data.owner_user ? data.owner_user.username : "404"}`)}
                        >
                            {data.owner_user.username}
                        </Link>
                        :
                        <React.Fragment></React.Fragment>
                    }
                </Grid>

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



                <Divider flexItem textAlign="left" sx={{
                    margin: '1.5rem 0 0 0',
                    width: '100%',
                    borderBottomWidth: '3px'
                }} /> 

                <Grid item xs={12}>
                    <Typography 
                        display={'flex'}
                        justifyContent={'left'}
                        color={'text.primary'} 
                        variant='subtitle1' 
                        margin={"0rem"}
                        padding={"0.1rem"}
                    >
                        Room Status
                    </Typography>
                </Grid>


                <Grid item xs={12} sm={6} justifyContent={'left'}>
                    <Button variant="contained" sx={{
                        display: "flex",
                        margin: "1rem 0 0 0"
                    }}>
                        Join Session
                    </Button>
                </Grid>

                <Grid item container xs={12} sm={6} justifyContent={'right'}>
                        <Typography 
                            display={'flex'}
                            justifyContent={'right'}
                            color={'primary.light'} 
                            variant='h6' 
                            margin={"0rem"}
                            padding={"0.1rem"}
                        >
                            Online - 5 / 5
                        </Typography>
                </Grid>




                <Divider flexItem textAlign="left" sx={{
                    margin: '1.5rem 0 0 0',
                    width: '100%',
                    borderBottomWidth: '3px'
                }} /> 

                <Grid item xs={12}>
                    <Typography 
                        display={'flex'}
                        justifyContent={'left'}
                        color={'text.primary'} 
                        variant='subtitle1' 
                        margin={"0rem 0rem 0rem 0rem"}
                        padding={"0.1rem"}
                    >
                        Room Management
                    </Typography>
                </Grid>

                <Grid item xs={12} display={'flex'} flexDirection={'row'} justifyContent={'left'}>
                    <Button variant="contained" sx={{
                        display: "flex",
                        margin: "0.5rem 0"
                    }}>
                        Set Room Offline
                    </Button>

                    <Button variant="contained" sx={{
                        display: "flex",
                        margin: "0.5rem 0.5rem"
                    }}>
                        Occupany Control
                    </Button>

                    <Button variant="contained" sx={{
                        display: "flex",
                        margin: "0.5rem 0"
                    }}>
                        Set Room Private
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
};


const RoomEquipSection = (props: {
    data: CardListProps}) => 
{
    const {data} = props;
    if (data && data.cardContent && data.cardContent.length !== 0) {
        return (
            <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant='h4' color={'text.primary'}>Room Equip</Typography>
                </Grid>
                <Grid item container xs={12} margin={"1rem 0rem 0rem 0rem"}>
                    <CardList 
                        listid={data.listid}
                        cardType={data.cardType}
                        navigate={data.navigate}
                        cardContent={data.cardContent}
                        renderConfig={data.renderConfig}
                        displayIsProcessing={data.displayIsProcessing}
                        displayError={data.displayError}
                    />
                </Grid>
            </Grid>
        </Paper>
        )
    } else {
        return <React.Fragment />
    }
};

const PageLoadHandler = (props: {
    authData: authToken, 
    navigate: NavigateFunction,
    alertSetter: Function | undefined, 
    renderData: ReduxDataPayload}) => {
    const { authData, navigate, alertSetter, renderData } = props; 


    const pageLoaded = () => {
        return (
            <React.Fragment>
                <RoomProfileHeader navigate={navigate} data={renderData.Room} />
                <RoomEquipSection data={renderData.Equip} />
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



const RoomProfile = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();

    const params: any = useParams();

    // React / Redux Function Instantiations
    const dispatch = useDispatch();

    const reduxRoom: ReturnRoomObject = useSelector((store: RootStateOrAny) => store?.redRoom);
    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);
    const equipCardContentList = buildEquipContentList(reduxEquipList);

    const equipCardListData: CardListProps = {
        listid: `${authData.username}-equip-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: equipCardContentList,
        renderConfig: EquipDirectoryCardProps,
        displayIsProcessing: reduxEquipList.isProcessing,
        displayError: reduxEquipList.error
    };


    useEffect(() => {
        dispatch(fetchRoomProfile(params.roomID));
        dispatch(fetchEquipListRoom(params.roomID));
    }, [dispatch]);

    const renderData: ReduxDataPayload = {
        Room: reduxRoom,
        Equip: equipCardListData
    };

    return (
        <Grid container spacing={2} justifyContent={'center'} width={'100%'}>
            <Grid item container justifyContent={'center'} maxWidth={'1200px'}>
                <PageLoadHandler 
                    authData={authData}
                    navigate={navigate}
                    alertSetter={alertSetter}
                    renderData={renderData}
                />
            </Grid>
        </Grid>
    )
};

export default RoomProfile;



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