import {
    Grid,
    Typography
} from "@mui/material"


const EquipProfile = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Equip Profile Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Exciting stuff about the equipment!</Typography>
            </Grid>
        </Grid>
    )
};

export default EquipProfile;