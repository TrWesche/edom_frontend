import {
    Grid,
    Typography
} from "@mui/material"


const RobotSession = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the active Video / Data Session with the Robot Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Video Feed!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Buttons and Things</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Chat Maybe?</Typography>
            </Grid>
        </Grid>
    )
};

export default RobotSession;