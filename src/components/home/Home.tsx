import React from "react";

import {
    Grid,
    Typography
} from "@mui/material"



const Home = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>Welcome to EDO!</Typography>
                <Typography>The Edge Device Orchestration Platform</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Left Home Column</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
                <Typography>Right Home Column</Typography>
            </Grid>
        </Grid>
    )
}

export default Home