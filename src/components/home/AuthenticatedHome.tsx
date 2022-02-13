// React
import React, { useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Box,
    Button,
    Typography,
    Skeleton,
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
import { authToken } from '../../providers/authProvider';

import HandleButtonClick from '../../utils/HandleButtonClick';

// Interface Imports
import { GroupObjectProps, RoomObjectProps } from '../../interfaces/globalInterfaces';
import { fetchGroupList } from '../../redux/actions/actGroupList';
import { fetchRoomList } from '../../redux/actions/actRoomList';


interface GroupListProps {
    group: Array<GroupObjectProps>
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
                        height: '100px',
                        textOverflow: 'ellipsis' 
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.headline}
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
            <Skeleton height="100px"/>
        </Box>
    )
};

const HorizontalGroupList = (listid: string, displayqty: number, list: GroupListProps) => {
    const stateLoading = () => {
        const skeletonArray = new Array(displayqty);

        return (
            <React.Fragment>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} key={`${listid}-${idx}`}>
                            {GroupCardSkeleton()}
                        </Grid>   
                    );
                })}
            </React.Fragment>
        );
    };

    const stateError = () => {
        return (
            <React.Fragment>
                <Typography>
                    Uh oh... Something went wrong.
                </Typography>
            </React.Fragment>
        );
    };

    const stateLoaded = () => {
        return (
            <React.Fragment>
                {list.group.map(data => {
                    return (
                        <Grid item xs={4} key={`${listid}-${data.id}`}>
                            {GroupCard(data)}
                        </Grid>    
                    )
                })}
                {displayMore()}  
            </React.Fragment>
        );
    };

    const displayMore = () => {
        if (list.group.length > displayqty) {
            return (
                <Grid item xs={12} key={`${listid}-more`}>
                    <p>View More</p>
                </Grid>
            )
        }
    };

    if (list === undefined || list.group === undefined) {
        return (
            <Grid container item>
                {stateLoading()}
            </Grid>
        )
    };

    if (list.error) {
        return (
            <Grid container item>
                {stateError()}
            </Grid>
        );
    } else if (list.isProcessing) {
        return (
            <Grid container item>
                {stateLoading()}
            </Grid>
        )
    } else if (!list.isProcessing) {
        return (
            <Grid container item>
                {stateLoaded()}
            </Grid>
        )
    };
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
                        height: '100px',
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

const RoomCardSkeleton = () => {
    return (
        <Box sx={{
            maxWidth: "345"
        }}>
            <Skeleton height="140px"/>
            <Skeleton height="100px"/>
        </Box>
    )
};

const HorizontalRoomList = (listid: string, displayqty: number, list: RoomListProps) => {
    const stateLoading = () => {
        const skeletonArray = new Array(displayqty);

        return (
            <React.Fragment>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} key={`${listid}-${idx}`}>
                            {RoomCardSkeleton()}
                        </Grid>   
                    );
                })}
            </React.Fragment>
        );
    };

    const stateError = () => {
        return (
            <React.Fragment>
                <Typography>
                    Uh oh... Something went wrong.
                </Typography>
            </React.Fragment>
        );
    };

    const stateLoaded = () => {
        return (
            <React.Fragment>
                {list.rooms.map(data => {
                    return (
                        <Grid item xs={4} key={`${listid}-${data.id}`}>
                            {RoomCard(data)}
                        </Grid>    
                    )
                })}
                {displayMore()}  
            </React.Fragment>
        );
    };

    const displayMore = () => {
        if (list.rooms.length > displayqty) {
            return (
                <Grid item xs={12} key={`${listid}-more`}>
                    <p>View More</p>
                </Grid>
            )
        }
    };

    if (list === undefined || list.rooms === undefined) {
        return (
            <Grid container item>
                {stateLoading()}
            </Grid>
        )
    };

    if (list.error) {
        return (
            <Grid container item>
                {stateError()}
            </Grid>
        );
    } else if (list.isProcessing) {
        return (
            <Grid container item>
                {stateLoading()}
            </Grid>
        )
    } else if (!list.isProcessing) {
        return (
            <Grid container item>
                {stateLoaded()}
            </Grid>
        )
    };
};

const PageLoadHandler = (props: {
        authData: authToken, 
        alertSetter: Function | undefined, 
        reduxData: ReduxDataPayload}) => {
    const { authData, alertSetter, reduxData } = props; 


    const pageLoaded = () => {
        console.log(reduxData);
        return (
            <React.Fragment>
                {HomePageHeader()}
                {HorizontalGroupList("featured-groups", 3, reduxData.groups)}
                {HorizontalRoomList("featured-rooms", 3, reduxData.rooms)}
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
                alertSetter={alertSetter}
                reduxData={reduxData}
            />
        </Grid>
    )
}

export default AuthenticatedHome