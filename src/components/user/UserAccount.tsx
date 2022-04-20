import { useState } from "react";

import {
    Grid,
    Paper,
    Tabs,
    Tab,
    Typography,
    Box
} from "@mui/material"

import UserUpdateAccountForm from "../building_blocks/users/UserUpdateAccountForm";
import UserUpdateProfileForm from "../building_blocks/users/UserUpdateProfileForm";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}



const TabPanel = (props: TabPanelProps) => {
    const { children, index, value, ...other } = props;

    return (
        <div 
            role={"tabpanel"}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{padding: "12px"}}>
                    {children}
                </Box>
            )}
        </div>
    )
};

const tabProps = (index: number) => {
    return {
      id: `uac-tab-${index}`,
      'aria-controls': `uac-tabpanel-${index}`,
    };
}


const UserAccount = () => {
    const [tabIDX, setTabIDX] = useState(0);

    const handleChange = (e: React.SyntheticEvent, newIDX: number) => {
        setTabIDX(newIDX);
    };

    // TODO 1: Need to come back to fix the style on selected
    // TODO 2: Page organization will need to change when the page width becomes to small.
    return (
        <Grid container spacing={2} justifyContent={'center'} margin={"30px 0"}>
            <Paper elevation={3} sx={{ display: 'flex', m: 1, width: '80%', alignItems: 'center', padding: '1.5rem' }}>
                <Grid item sm={12} md={3}>
                    <Tabs
                        orientation="vertical"
                        aria-label="Account Control Categories"
                        value={tabIDX}
                        onChange={handleChange}
                        sx={{ borderRight: 1, borderColor: 'divider', alignItems: 'flex-start', flexGrow: 1 }}
                    >
                        <Tab 
                            label="Account Preferences" 
                            sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}} 
                            {...tabProps(0)}
                        />
                        <Tab label="Public Profile Settings"  
                            sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}} 
                            {...tabProps(1)}
                        />
                        <Tab label="Subscriptions"  
                            sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}} 
                            {...tabProps(2)}
                        />
                        <Tab label="Open Requests"  
                            sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}} 
                            {...tabProps(3)}
                        />
                        <Tab label="Groups"  
                            sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}} 
                            {...tabProps(4)}
                        />
                        <Tab label="Rooms"  
                            sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}} 
                            {...tabProps(5)}
                        />
                        <Tab label="Equipment"  
                            sx={{color: "text.primary", maxWidth: "100%", width: "100%", alignItems: "start"}} 
                            {...tabProps(6)}
                        />
                    </Tabs>
                </Grid>
                <Grid item sm={12} md={9}>
                    <TabPanel value={tabIDX} index={0}>
                        {UserUpdateAccountForm()}
                    </TabPanel>
                    <TabPanel value={tabIDX} index={1}>
                        {UserUpdateProfileForm()}
                    </TabPanel>
                    <TabPanel value={tabIDX} index={2}>
                        <Typography>Testing 2</Typography>
                    </TabPanel>
                    <TabPanel value={tabIDX} index={3}>
                        <Typography>Testing 3</Typography>
                    </TabPanel>
                    <TabPanel value={tabIDX} index={4}>
                        <Typography>Testing 4</Typography>
                    </TabPanel>
                    <TabPanel value={tabIDX} index={5}>
                        <Typography>Testing 5</Typography>
                    </TabPanel>
                    <TabPanel value={tabIDX} index={6}>
                        <Typography>Testing 6</Typography>
                    </TabPanel>
                </Grid>
            </Paper>
        </Grid>
    )
};

export default UserAccount;