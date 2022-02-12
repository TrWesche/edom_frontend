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
    Container,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    CardMedia
} from "@mui/material"

import {
    PrecisionManufacturing,
    Forum,
    Chat
} from '@mui/icons-material';

// Providers
import { authToken, useAuth } from '../../providers/authProvider';
import { useAlert } from '../../providers/alertProvider';

import HandleButtonClick from '../../utils/HandleButtonClick';

// Interface Imports
import { GroupObjectProps, RoomObjectProps } from '../../interfaces/globalInterfaces';
import { fetchGroupList } from '../../redux/actions/actGroupList';


interface GroupListProps {
    groups: Array<GroupObjectProps>
    isProcessing: boolean
    error?: boolean
};

interface RoomListProps {
    rooms: Array<RoomObjectProps>
    isProcessing: boolean
    error?: boolean
};

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

const GroupCard = (data: GroupObjectProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src="https://www.scuttlerobot.org/images/virtuemart/product/Scuttle-Render-Assembled-Base-1280x720.jpg"
                    alt="Scuttle Robot Picture"
                />
                <CardContent
                    sx={{
                        height: '200px',
                        textOverflow: 'ellipsis' 
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Group Headline
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Management Actions Area?
                </Button>
            </CardActions>
        </Card>          
    )
};

const GroupCardSkeleton = () => {
    return (
        <Box sx={{
            maxWidth: "345"
        }}>
            <Skeleton height="140px"/>
            <Skeleton height="200px"/>
        </Box>
    )
};

const HorizontalGroupList = (listid: string, displayqty: number, list: GroupListProps) => {
    const loadingState = () => {
        const skeletonArray = new Array(displayqty);

        return (
            <Grid container spacing={2}>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} key={`${listid}-${idx}`}>
                            {GroupCardSkeleton()}
                        </Grid>   
                    );
                })}
            </Grid>
        );
    }

    const displayMore = () => {
        if (list.groups.length > displayqty) {
            return (
                <Grid item xs={12} key={`${listid}-more`}>
                    <p>View More</p>
                </Grid>
            )
        }
    };

    return (
        <Grid container spacing={2}>
            {list.groups.map(data => {
                return (
                    <Grid item xs={12} key={`${listid}-${data.id}`}>
                        {GroupCard(data)}
                    </Grid>    
                )
            })}
            {displayMore()}  
        </Grid>
    );
};

const RoomCard = (data: RoomObjectProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src="https://www.scuttlerobot.org/images/virtuemart/product/Scuttle-Render-Assembled-Base-1280x720.jpg"
                    alt="Scuttle Robot Picture"
                />
                <CardContent
                    sx={{
                        height: '200px',
                        textOverflow: 'ellipsis' 
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Room Headline
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Management Actions Area?
                </Button>
            </CardActions>
        </Card>          
    )
};

const HorizontalRoomList = (listid: string, displayqty: number, list: RoomListProps) => {
    // const displayMore = () => {
    //     if (list.length > displayqty) {
    //         return (
    //             <Grid item xs={12} key={`${listid}-more`}>
    //                 <p>View More</p>
    //             </Grid>
    //         )
    //     }
    // };

    // return (
    //     <Grid container spacing={2}>
    //         {list.map(data => {
    //             return (
    //                 <Grid item xs={12} key={`${listid}-${data.id}`}>
    //                     {RoomCard(data)}
    //                 </Grid>    
    //             )
    //         })}
    //         {displayMore()}  
    //     </Grid>
    // );

    return (
        <Grid container spacing={2}>
            <Typography>
                Under Development
            </Typography>
        </Grid>
    )
};

const PageLoadHandler = (props: {
        authData: authToken, 
        navigate: NavigateFunction, 
        alertSetter: Function | undefined, 
        reduxData: ReduxDataPayload}) => {
    const { authData, navigate, alertSetter, reduxData } = props; 

    // const pageLoading = () => {
    //     return (
    //         <React.Fragment>
    //             <Grid item container width={'100%'} margin={'0 0 2rem 0'}>
    //                 <Skeleton variant="rectangular" height={350} />
    //             </Grid>

    //             <Grid item container width={'100%'} margin={'0 0 2rem 0'}>
    //                 <Skeleton variant="rectangular" height={500} />
    //             </Grid>

    //             <Grid item container width={'100%'} margin={'0 0 2rem 0'}>
    //                 <Skeleton variant="rectangular" height={500} />
    //             </Grid>
    //         </React.Fragment>
    //     );
    // };


    const pageLoaded = () => {
        return (
            <React.Fragment>
                {HomePageHeader()}
                {HorizontalGroupList("featured-groups", 3, reduxData.groups)}
                {HorizontalRoomList("featured-rooms", 3, reduxData.rooms)}
            </React.Fragment>
            
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

    return (
        <React.Fragment>
            {pageLoaded()}
        </React.Fragment>
    );
};


const AuthenticatedHome = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();
    
    const params: any = useParams();

    const reduxGroupList: GroupListProps = useSelector((store: RootStateOrAny) => store?.groupList);
    const reduxRoomList: RoomListProps = useSelector((store: RootStateOrAny) => store?.roomList);


    useEffect(() => {
        dispatch(fetchGroupList());
        // dispatch(fetchRoomList());
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