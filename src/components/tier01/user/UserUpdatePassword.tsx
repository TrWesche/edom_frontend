// Material UI
import {
    Grid,
    Box,
    Typography
} from "@mui/material"

import UserUpdatePasswordForm from "../../tier02/user/UserUpdatePasswordForm";

const UserUpdatePassword = () => {   
    return (
        <Grid item container xs={12}>
            <Grid item xs={12} flexDirection='column' display={'flex'} justifyContent={'center'}>
                <Typography display={'flex'} variant='h2' align='center' color={'text.primary'} margin='0.25rem' sx={{justifyContent: 'center'}}>
                    Update Password
                </Typography>
                <Box display={'flex'} justifyContent={'center'}>
                    <UserUpdatePasswordForm />
                </Box>
            </Grid>
        </Grid>
    )
}

export default UserUpdatePassword;