import {
    Paper,
    Grid,
    Typography,
    TextField,
    Divider,
    Card,
    CardHeader,
    CardContent
} from "@mui/material";


const ChatWindow = () => {
    return (
        <Paper>
            <Grid xs={12}>
                <Typography variant='h3'>Chat</Typography>
            </Grid>

            <Divider />

            <Grid xs={12}>
                <Grid xs={12} component={Card}>
                    <CardHeader>
                        <Typography variant='body1'>MyUserBrings</Typography>
                    </CardHeader>
                    <CardContent>
                        <Typography variant='body2'>Message from that nice malt shop nearby.</Typography>
                    </CardContent>
                </Grid>

                <Grid xs={12} component={Card}>
                    <CardHeader>
                        <Typography variant='body1'>The Boys To</Typography>
                    </CardHeader>
                    <CardContent>
                        <Typography variant='body2'>Message from the yard.</Typography>
                    </CardContent>
                </Grid>
            </Grid>

            <Divider />

            <Grid xs={12} component={TextField} />
        </Paper>
    )
}

export default ChatWindow;