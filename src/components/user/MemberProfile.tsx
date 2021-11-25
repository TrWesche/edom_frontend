import {
    Grid,
    Typography
} from "@mui/material"


const MemberProfile = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Member Profile Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Stuff about the individual member or the team!</Typography>
            </Grid>
        </Grid>
    )
};

export default MemberProfile;