import {
    Grid,
    Typography
} from "@mui/material"


const UserDirectorySite = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Member Directory Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Member 1</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Member 2</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Member 3</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Member 4</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Member 5</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Member n</Typography>
            </Grid>
        </Grid>
    )
};

export default UserDirectorySite;