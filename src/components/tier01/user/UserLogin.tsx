// Material UI
import {
    Grid,
    Box,
    Button,
    Typography
} from "@mui/material"

import HandleButtonClick from '../../../utils/HandleButtonClick';
import LoginForm from '../../tier02/user/UserLoginForm';

const UserLogin = () => {   
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
                        onClick={HandleButtonClick}
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