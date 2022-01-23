import {
    Grid,
    Typography
} from "@mui/material"


const GroupDirectory = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Group Directory Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Group 1</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Group 2</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Group 3</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Group 4</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Group 5</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Group n</Typography>
            </Grid>
        </Grid>
    )
};

export default GroupDirectory;