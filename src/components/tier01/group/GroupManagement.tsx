import {
    Grid,
    Typography
} from "@mui/material"


const GroupManagement = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Group Management Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Authorized Members will be able to update group account and manage their equipment from here!</Typography>
            </Grid>
        </Grid>
    )
};

export default GroupManagement;