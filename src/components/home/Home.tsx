// React
import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams, useHref } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Stack,
    Skeleton,
    Container
} from "@mui/material"

import {
    PrecisionManufacturing,
    Forum,
    Chat
} from '@mui/icons-material';

// Providers
import { authToken, useAuth } from '../../providers/authProvider';
import { useAlert } from '../../providers/alertProvider';

// Interface Impors
import { GroupObjectProps, RoomObjectProps } from '../../interfaces/globalInterfaces';
import { fetchGroupList } from '../../redux/actions/actGroupList';

const PageLoadHandler = (props: {authData: authToken, navigate: NavigateFunction, alertSetter: Function | undefined, data: any, isProcessing: boolean, reduxError: boolean}) => {
    const { authData, navigate, alertSetter, data, isProcessing, reduxError } = props; 

    const pageLoading = () => {
        return (
            <Box  sx={{
                display: 'grid',
                width: '100%',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `
                    "avatar details details details details details"
                    "info info info info info info"
                `,
                }}
            >
                <Box sx={{ gridArea: 'avatar'}}>
                    <Skeleton variant="circular" width={152} height={152} />
                </Box>
                <Box sx={{ gridArea: 'details'}}>
                    <Skeleton variant="rectangular" height={152} />
                </Box>

                <Box sx={{ gridArea: 'info'}}>
                    <Skeleton variant="rectangular" height={400} />
                </Box>
            </Box>
        );
    };

    const dataLoaded = () => {
        if (data !== undefined) {
            return (
                <Stack>
                    <Typography display={"flex"} flexDirection={"row-reverse"}>{data.username ? data.username : "Failed to Retrieve Username"}</Typography>
                    <Typography display={"flex"} flexDirection={"row-reverse"}>{data.first_name} {data.last_name}</Typography>
                    <Typography display={"flex"} flexDirection={"row-reverse"}>{data.email ? data.email : ""}</Typography>
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
            <Box  sx={{
                display: 'grid',
                width: '100%',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `
                    "avatar details details details details details"
                    "about about about about about about"
                    "groups groups groups groups groups groups"
                    "rooms rooms rooms rooms rooms rooms"
                    "equip equip equip equip equip equip"
                `,
                }}
            >
                <Box sx={{ gridArea: 'details' }}>
                    {dataLoaded()}
                </Box>
            
            
                <Box sx={{ gridArea: 'about'}}>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        bgcolor={'grey.A200'}
                        padding={"0.25rem"}
                        borderRadius={"0.25rem"}
                    >
                        About Me
                    </Typography>
                </Box>
                <Box sx={{ gridArea: 'groups'}}>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        bgcolor={'grey.A200'}
                        padding={"0.25rem"}
                        borderRadius={"0.25rem"}
                    >
                        Groups
                    </Typography>
                </Box>
                <Box sx={{ gridArea: 'rooms'}}>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        bgcolor={'grey.A200'}
                        padding={"0.25rem"}
                        borderRadius={"0.25rem"}
                    >
                        Rooms
                    </Typography>
                </Box>
                <Box sx={{ gridArea: 'equip'}}>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        bgcolor={'grey.A200'}
                        padding={"0.25rem"}
                        borderRadius={"0.25rem"}
                    >
                        Equipment
                    </Typography>
                </Box>
            </Box>
        );
    };

    const pageLoadError = () => {
        return (
            <Paper>
                <Grid item xs={12}>
                    <Typography>Something went wrong.</Typography>
                </Grid>
            </Paper>
        );
    };

    // User Logged In Check
    if (!authData.logged_in && authData.init) {
        console.log(authData);
        console.log("User Not Logged In?");
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



interface ButtonClickEvent extends React.FormEvent<HTMLButtonElement> {
    target: ButtonClickTarget
};

interface ButtonClickTarget extends EventTarget {
    href?: string
};

// interface ButtonClickData {
//     root?: string
// }


const Home = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();
    
    const params: any = useParams();

    // const reduxGroupList: Array<GroupObjectProps> = useSelector((store: RootStateOrAny) => store?.groupList);
    // const reduxRoomList: Array<RoomObjectProps> = useSelector((store: RootStateOrAny) => store?.roomList);


    // useEffect(() => {
    //     dispatch(fetchGroupList());
    // }, [dispatch]);

    const handleButtonClick = (e: ButtonClickEvent) => {
        e.preventDefault();
        
        if (e.target.href !== undefined) {
            const destURL = new URL(e.target.href);
            if (destURL.hostname !== "localhost") { // TODO: This should be replaced with a variable
                window.open(e.target.href, '_blank');
            } else {
                navigate(`${destURL.pathname}${destURL.search}`);
            }
        } else {
            console.log("Error, destination not defined")
        }
    }
    

    return (
        <Grid justifyContent={'center'} width={'100%'}>
            <Box  sx={{
                display: 'grid',
                width: '100%',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `
                    "hero hero hero hero hero hero"
                    "scuttle scuttle discord discord blog blog"
                    "example example example example example example"
                `,
                }}
            >
                <Box sx={{
                    gridArea: 'hero',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Typography display={'flex'} variant='h2' align='center' color={'primary.dark'}>
                                Connect, Control, Create
                            </Typography>
                            <Typography display={'flex'} variant='h6' align='center' color={'secondary.dark'}>
                                The Connectivity Solution for Managing and
                                Orchestrating Devices on the Edge
                            </Typography>
                            <Button 
                                href='/login' 
                                variant="contained" 
                                color="primary"
                                startIcon={<Chat />}
                                onClick={handleButtonClick}
                            >
                                Sign In
                            </Button>
                            <Button 
                                href='/register' 
                                variant="contained" 
                                color="secondary"
                                startIcon={<Chat />}
                                onClick={handleButtonClick}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img 
                                src='https://picturepark.com/data/cutting-edge-large.png'
                                alt='Hero Image'
                                height='400px'
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{display: 'flex', gridArea: 'scuttle', justifyContent: 'center'}}>
                    <Button 
                        href='https://www.scuttlerobot.org/' 
                        variant="contained" 
                        startIcon={<PrecisionManufacturing />} 
                        onClick={handleButtonClick}
                    >
                        SCUTTLE
                    </Button>
                </Box>

                <Box sx={{display: 'flex', gridArea: 'discord', justifyContent: 'center'}}>
                    <Button 
                        href='https://discord.gg/8q6MFRcW79' 
                        variant="contained" 
                        startIcon={<Chat />}
                        onClick={handleButtonClick}
                    >
                        Discord
                    </Button>
                </Box>

                <Box sx={{display: 'flex', gridArea: 'blog', justifyContent: 'center'}}>
                    <Button disabled variant="contained" startIcon={<Forum />}>
                        Forums
                    </Button>
                </Box>

            </Box>
        </Grid>
    )
}

export default Home