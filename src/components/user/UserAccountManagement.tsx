import {
    Grid,
    Typography
} from "@mui/material"


const UserAccountManagement = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Member Account Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Member will be able to update their account and manager their robots from here!</Typography>
            </Grid>
        </Grid>
    )
};

export default UserAccountManagement;