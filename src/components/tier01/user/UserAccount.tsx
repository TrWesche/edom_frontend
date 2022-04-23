// Library Imports
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

import {
    Grid,
    Paper,
    Tabs,
    Tab,
    Typography,
    Box
} from "@mui/material"

// Component Imports
import UserUpdateAccountForm from "../../tier02/user/UserUpdateAccountForm";
import UserUpdateProfileForm from "../../tier02/user/UserUpdateProfileForm";
import CardList, { CardListProps } from "../../tier02/cardlist/CardList";


import { fetchEquipListUser } from '../../../redux/actions/actEquipList';

// Provider Imports
// import { useAlert } from '../../../providers/alertProvider';
import { useAuth } from '../../../providers/authProvider';
import { EquipListProps } from "../../tier02/cardlist/EquipCardListHorizontal";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
};


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
    // React / Redux Function Instantiations
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Context Providers
    // const { alertSetter } = useAlert();
    const { authData } = useAuth();

    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);
    const equipCardContentList = buildEquipContentList(reduxEquipList);
    // console.log(reduxEquipList);
    // console.log(equipCardContentList);

    const equipCardListData: CardListProps = {
        listid: `${authData.username}-equip-list`,
        cardType: "stacked",
        navigate: navigate,
        cardContent: equipCardContentList,
        displayIsProcessing: reduxEquipList.isProcessing,
        displayError: reduxEquipList.error
    }

    useEffect(() => {
        dispatch(fetchEquipListUser(authData.username ? authData.username : "error"));
    }, [dispatch, authData.username]);


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
                        {CardList(equipCardListData)}
                    </TabPanel>
                </Grid>
            </Paper>
        </Grid>
    )
};

export default UserAccount;




const buildEquipContentList = (data: EquipListProps ) => {
    const retList: any = [];
    if (!data.equip) {
        return retList;
    }
    data.equip.forEach(element => {
        retList.push({
            settings: {
                displayEdit: true,
                displayMedia: true,
                mediaHeight: 100,
                displayContent: true,
                contentHeight:  200,
                displayActions: false,
                actionHeight: 100,
                enableActionArea: true
            },
            data: {
                editAllowed: element.edit_permissions || false,
                editButtonDestination: `/equip/${element.id}` || `#`,
                actionAreaDestination: `/equip/${element.id}` || `#`,
                mediaURI: element.image_url || `Not Found`,
                mediaAltText: "TODO - Alt Text Not Stored",
                contentTexts: [
                    {textVariant: "h5", textContent: element.name}, 
                    {textVariant: "body2", textContent: element.headline}, 
                    {textVariant: "h5", textContent: element.description}
                ]
            }
        })
    });

    return retList;
};