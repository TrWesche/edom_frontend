import {
    Grid,
    Typography
} from "@mui/material"



const PageNotFound = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>Oh No!</Typography>
                <Typography>It seems we can't find the page you're looking for.</Typography>
            </Grid>
        </Grid>
    )
}

export default PageNotFound;