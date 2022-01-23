import {
    Grid,
    Typography
} from "@mui/material"


const RobotProfile = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Robot Profile Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Exciting stuff about the robot!</Typography>
            </Grid>
        </Grid>
    )
};

export default RobotProfile;