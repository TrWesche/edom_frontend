// Material UI
import {
    Grid,
    Box,
    Button,
    Typography
} from "@mui/material"

import HandleButtonClick from '../../utils/HandleButtonClick';
import RegisterForm from "../building_blocks/users/UserRegisterForm";

const UserLogin = () => {   
    return (
        <Grid item container xs={12}>
            <Grid item xs={12} flexDirection='column' display={'flex'} justifyContent={'center'}>
                <Typography display={'flex'} variant='h2' align='center' color={'text.primary'} margin='0.25rem' sx={{justifyContent: 'center'}}>
                    Create Your EDOM Account
                </Typography>
                <Box display={'flex'} justifyContent={'center'}>
                    <RegisterForm />
                </Box>

                <Box display={'flex'} justifyContent={'center'}>
                    <Button 
                        href='/login' 
                        variant="contained" 
                        color="secondary"
                        onClick={HandleButtonClick}
                        sx={{
                            margin: '0.25rem',
                            width: '200px'
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default UserLogin;