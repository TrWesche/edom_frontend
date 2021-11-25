import {
    Grid,
    Typography
} from "@mui/material"



const RoomSession = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This is where the Rooms will live!</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Tag Room 1</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
                <Typography>Experimentation Room 1</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Capture the Flag Room 1</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Racing Room 1</Typography>
            </Grid>
        </Grid>
    )
}

export default RoomSession;