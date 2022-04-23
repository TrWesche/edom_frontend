// React
import React, { useEffect, MouseEvent } from 'react';
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
import EquipCardListHorizontal, { EquipListProps } from '../../tier02/cardlist/EquipCardListHorizontal';
import { ReturnRoomObject } from '../../../interfaces/edomRoomInterfaces';
import { fetchRoomProfile } from '../../../redux/actions/actRoom';
import { fetchEquipListRoom } from '../../../redux/actions/actEquipList';


interface ReduxDataPayload {
    Room: ReturnRoomObject
    equips: EquipListProps
};


interface ClickEvent extends MouseEvent<HTMLButtonElement> {
    target: ClickTarget
};

interface ClickTarget extends EventTarget {
    href?: string
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

const RoomProfileHeader = (navigate: NavigateFunction, data: ReturnRoomObject) => {
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


const RoomEquipSection = (navigate: NavigateFunction, data: EquipListProps) => {
    if (data && data.equip && data.equip.length !== 0) {
        return (
            <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant='h4' color={'text.primary'}>Room Equip</Typography>
                </Grid>
                <Grid item container xs={12} margin={"1rem 0rem 0rem 0rem"}>
                    {EquipCardListHorizontal(navigate, "Room-equip", 4, data)}
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
                {RoomProfileHeader(navigate, reduxData.Room)}
                {RoomEquipSection(navigate, reduxData.equips)}
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


    useEffect(() => {
        dispatch(fetchRoomProfile(params.roomID));
        dispatch(fetchEquipListRoom(params.roomID));
    }, [dispatch]);

    const reduxData: ReduxDataPayload = {
        Room: reduxRoom,
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

export default RoomProfile;