// React
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

// Material UI
import {
    Grid,
    Box,
    Button,
    Typography
} from "@mui/material"

import {
    PrecisionManufacturing,
    Forum,
    Chat
} from '@mui/icons-material';

import HandleButtonClick from '../../utils/HandleButtonClick';
import UserLogin from "../user/UserLogin";

// Providers
import { authToken } from '../../providers/authProvider';

const AnonymousHome = (props: {authData: authToken, navigate: NavigateFunction, alertSetter: Function | undefined}) => {   
    return (
        <React.Fragment>
            <Grid item container width={'100%'} margin={'0 0 2rem 0'}>
                <Grid item xs={12} lg={5} flexDirection='column' display={'flex'} justifyContent={'center'}>
                    <Typography display={'flex'} variant='h2' align='center' color={'text.primary'} margin='0.25rem' sx={{justifyContent: 'center'}}>
                        Connect, Control, Create
                    </Typography>
                    <Typography display={'flex'} variant='h6' align='center' color={'secondary.light'} margin='0.25rem' sx={{justifyContent: 'center'}}>
                        The Connectivity Solution for Managing and
                        Orchestrating Devices on the Edge
                    </Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <UserLogin />
                    </Box>

                    <Box display={'flex'} justifyContent={'center'}>
                        <Button 
                            href='/register' 
                            variant="contained" 
                            color="secondary"
                            onClick={HandleButtonClick}
                            sx={{
                                margin: '0.25rem',
                                width: '150px'
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={7} display={'flex'} justifyContent={'center'} maxHeight={'450px'}>
                    <img 
                        src='https://picturepark.com/data/cutting-edge-large.png'
                        alt='Hero Image'
                        width={'100%'}
                        object-fit='cover'
                    />
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
}

export default AnonymousHome;