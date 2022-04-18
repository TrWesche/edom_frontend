import {
    Grid,
    Paper,
    Tabs,
    Tab,
    Typography
} from "@mui/material"


const UserAccount = () => {
    return (
        <Grid container spacing={2} justifyContent={'center'} margin={"30px 0"}>
            <Paper elevation={3} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                <Grid item sm={12} md={3}>
                    <Tabs
                        orientation="vertical"
                        aria-label="Account Control Categories"
                        sx={{ borderRight: 1, borderColor: 'divider', alignItems: 'flex-start', flexGrow: 1 }}
                    >
                        <Tab label="Account Preferences" sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}}/>
                        <Tab label="Public Profile Settings" sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}} />
                        <Tab label="Subscriptions" sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}}/>
                        <Tab label="Open Requests" sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}}/>
                        <Tab label="Groups" sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}}/>
                        <Tab label="Rooms" sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}}/>
                        <Tab label="Equipment" sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}}/>
                    </Tabs>
                </Grid>
                <Grid item sm={12} md={9}>

                </Grid>
            </Paper>
        </Grid>
    )
};

export default UserAccount;