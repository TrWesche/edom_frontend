import {
    Grid,
    Typography
} from "@mui/material"


const GroupProfile = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Group Profile Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Stuff about the individual group</Typography>
            </Grid>
        </Grid>
    )
};

export default GroupProfile;