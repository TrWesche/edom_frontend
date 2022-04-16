// Material UI
import {
    Grid,
    Box,
    Typography
} from "@mui/material"

import UserUpdateAccountForm from "../building_blocks/users/UserUpdateAccountForm";

const UserUpdateAccount = () => {   
    return (
        <Grid item container xs={12}>
            <Grid item xs={12} flexDirection='column' display={'flex'} justifyContent={'center'}>
                <Typography display={'flex'} variant='h2' align='center' color={'text.primary'} margin='0.25rem' sx={{justifyContent: 'center'}}>
                    Update Account Details
                </Typography>
                <Box display={'flex'} justifyContent={'center'}>
                    <UserUpdateAccountForm />
                </Box>
            </Grid>
        </Grid>
    )
}

export default UserUpdateAccount;