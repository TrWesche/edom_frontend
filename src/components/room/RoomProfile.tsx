import {
    Grid,
    Typography
} from "@mui/material"


const RoomProfile = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Room Profile Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Exciting stuff about the room!</Typography>
            </Grid>
        </Grid>
    )
};

export default RoomProfile;