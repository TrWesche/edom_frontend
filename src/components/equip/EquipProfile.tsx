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
    Paper,
    Divider,
    Button,
    Stack
} from "@mui/material"


// Providers
import { authToken, useAuth } from '../../providers/authProvider';
import { useAlert } from '../../providers/alertProvider';

// Interface Imports
import { EquipObjectProps } from '../../interfaces/globalInterfaces';
import { fetchEquipProfile } from '../../redux/actions/actEquip';


interface ReduxDataPayload {
    Equip: EquipObjectProps
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

const EquipProfileHeader = (navigate: NavigateFunction, data: EquipObjectProps) => {
    return (
        <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={3}>
                    <Avatar 
                        alt="Equip Image"
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
                        {data.category}
                    </Typography>

                    {data.group ? 
                        <Typography 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            padding={"0.25rem"}
                            textAlign={"right"}
                        >
                            {data.group.name}
                        </Typography>
                        :
                        <React.Fragment></React.Fragment>
                    }


                    {data.user ? 
                        <Typography 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            padding={"0.25rem"}
                            textAlign={"right"}
                        >
                            {data.user.username}
                        </Typography>
                        :
                        <React.Fragment></React.Fragment>
                    }


                    {data.room ? 
                        <Typography 
                            color={'secondary.dark'} 
                            variant='h5' 
                            margin={"1rem 0rem 0rem 0rem"}
                            padding={"0.25rem"}
                            textAlign={"right"}
                        >
                            {data.room.name}
                        </Typography>
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
                        margin={"0rem 0rem 0rem 0rem"}
                        padding={"0.1rem"}
                    >
                        Equip Management
                    </Typography>
                </Grid>

                <Grid item xs={12} display={'flex'} flexDirection={'row'} justifyContent={'left'}>
                    <Button variant="contained" sx={{
                        display: "flex",
                        margin: "0.5rem 0"
                    }}>
                        One-Click Room
                    </Button>

                    <Button variant="contained" sx={{
                        display: "flex",
                        margin: "0.5rem 0.5rem"
                    }}>
                        Assign to Room
                    </Button>

                    <Button variant="contained" sx={{
                        display: "flex",
                        margin: "0.5rem 0"
                    }}>
                        Set Equip Private
                    </Button>
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
                        Configuration
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography 
                        color={'secondary.light'} 
                        variant='body1' 
                        margin={"0rem 0rem 0rem 0rem"}
                        padding={"0 0.25rem 0.25rem 0.25rem"}
                    >
                        {data.configuration}
                    </Typography>
                </Grid>
                

            </Grid>
        </Paper>
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
                {EquipProfileHeader(navigate, reduxData.Equip)}
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

    const reduxEquip: EquipObjectProps = useSelector((store: RootStateOrAny) => store?.redEquip);


    useEffect(() => {
        dispatch(fetchEquipProfile(params.equipID, authData));
    }, [dispatch]);

    const reduxData: ReduxDataPayload = {
        Equip: reduxEquip
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