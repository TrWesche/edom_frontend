// Material UI
import {
    Grid,
    Box,
    Button,
    Typography
} from "@mui/material"

import { useNavigate } from "react-router-dom";

import { handleClickMouseEvent } from '../../../utils/clickHandlers';
import LoginForm from '../../tier02/user/UserLoginForm';

const UserLogin = () => { 
    // React / Redux Function Instantiations
    const navigate = useNavigate();

    return (
        <Grid item container xs={12}>
            <Grid item xs={12} flexDirection='column' display={'flex'} justifyContent={'center'}>
                <Typography display={'flex'} variant='h2' align='center' color={'text.primary'} margin='0.25rem' sx={{justifyContent: 'center'}}>
                    Login to EDOM
                </Typography>
                <Box display={'flex'} justifyContent={'center'}>
                    <LoginForm />
                </Box>

                <Box display={'flex'} justifyContent={'center'}>
                    <Button 
                        href='/register' 
                        variant="contained" 
                        color="secondary"
                        onClick={(e) => handleClickMouseEvent(e, navigate, '/register')}
                        sx={{
                            margin: '0.25rem',
                            width: '200px'
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default UserLogin;