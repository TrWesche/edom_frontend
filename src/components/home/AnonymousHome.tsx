// React
import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Paper,
    Box,
    Typography,
    Stack,
    Skeleton,
    Button
} from "@mui/material";


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
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `
                    "hero"
                    "links"
                    "login" 
                    "example"
                `,
                }}
            >
                <Box sx={{ gridArea: 'hero'}}>
                    <Skeleton variant="rectangular" height={152} />
                </Box>
                <Box sx={{ gridArea: 'links'}}>
                    <Skeleton variant="rectangular" height={40} />
                </Box>
                <Box sx={{ gridArea: 'login'}}>
                    <Skeleton variant="rectangular" height={152} />
                </Box>
                <Box sx={{ gridArea: 'example'}}>
                    <Skeleton variant="rectangular" height={400} />
                </Box>
            </Box>
        );
    };

    const pageLoaded = () => {
        return (
            <Box  sx={{
                display: 'grid',
                width: '100%',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `
                    "hero hero hero"
                    "scuttle discord blog"
                    "login login login" 
                    "example example example"
                `,
                }}
            >
                <Box sx={{ gridArea: 'hero', width: '80%'}}>
                    <Box sx={{height: '152', backgroundImage: 'https://pixy.org/src/474/4740812.jpg'}}></Box>
                </Box>

                <Box sx={{ gridArea: 'scuttle'}}>
                    <Button variant="contained" startIcon={<PrecisionManufacturing />}>
                        SCUTTLE
                    </Button>
                </Box>

                <Box sx={{ gridArea: 'discord'}}>
                    <Button variant="contained" startIcon={<Chat />}>
                        Discord
                    </Button>
                </Box>

                <Box sx={{ gridArea: 'blog'}}>
                    <Button variant="contained" startIcon={<Forum />}>
                        Forums
                    </Button>
                </Box>

                <Box sx={{ gridArea: 'login'}}>
                    <Typography>
                        New to EDOM?  Sign Up!
                    </Typography>
                    <Typography>
                        Returning User? Sign In!
                    </Typography>
                </Box>

                <Box sx={{ gridArea: 'example'}}>
                    <Box>
                        <Typography>
                            Sample Group
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>
                            Sample Room
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>
                            Sample Equipment
                        </Typography>
                    </Box>
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




const AnonymousHome = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();
    
    const params: any = useParams();

    const reduxGroupList: Array<GroupObjectProps> = useSelector((store: RootStateOrAny) => store?.groupList);
    const reduxRoomList: Array<RoomObjectProps> = useSelector((store: RootStateOrAny) => store?.roomList);
    useEffect(() => {
        dispatch(fetchGroupList());
    }, [dispatch]);

    return (
        <Grid justifyContent={'center'} width={'100%'}>
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

            <Grid item xs={12}>
                <Typography>Welcome to EDO!</Typography>
                <Typography>The Edge Device Orchestration Platform</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Left Home Column</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
                <Typography>Right Home Column</Typography>
            </Grid>
        </Grid>
    )
}

export default AnonymousHome;