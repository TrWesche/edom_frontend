import {
    Grid,
    Typography
} from "@mui/material"


const RobotDirectory = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Robot Directory Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 1</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 2</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 3</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 4</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 5</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot n</Typography>
            </Grid>
        </Grid>
    )
};

export default RobotDirectory;