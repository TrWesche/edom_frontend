// Library Imports
import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

import {
    Grid,
    Paper,
    Tabs,
    Tab,
    Typography,
    Box,
    CardProps
} from "@mui/material"

// Component Imports
import UserUpdateAccountForm from "../../tier02/user/UserUpdateAccountForm";
import UserUpdateProfileForm from "../../tier02/user/UserUpdateProfileForm";
import CardList, { CardListProps } from "../../tier02/cardlist/CardList";


import { fetchEquipListUser } from '../../../redux/actions/actEquipList';

// Provider Imports
import { useAlert } from '../../../providers/alertProvider';
import { authToken, useAuth } from '../../../providers/authProvider';
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
    const { alertSetter } = useAlert();
    const { authData } = useAuth();
    
    const params: any = useParams();
    
    // const reduxPayload: UserProfileProps = useSelector((store: RootStateOrAny) => store?.redUser);

    // const reduxGroupList: GroupListProps = useSelector((store: RootStateOrAny) => store?.redGroupList);
    // const reduxRoomList: RoomListProps = useSelector((store: RootStateOrAny) => store?.redRoomList);
    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);

    const equipCardContentList: Array<CardProps>;
    
    reduxEquipList.equip.forEach((eVal) => {
        return ({
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
                editAllowed: eVal.edit_permissions,
                editButtonDestination: `/equip/${eVal.id}`,
                actionAreaDestination: `/equip/${eVal.id}`,
                mediaURI: eVal.image_url,
                mediaAltText: "TODO - Alt Text Not Stored",
                contentTexts: [{textVariant: "h5", textContent: eVal.name}, {textVariant: "body2", textContent: eVal.headline}, {textVariant: "h5", textContent: eVal.description}]
            }
        })
    }, [])

    const cardDataEquipList: CardListProps = {
        listid: `${authData.username}-equip-list`,
        cardType: "stacked",
        navigate: navigate,
        cardContent: equipListForCards
    }

    useEffect(() => {
        dispatch(fetchEquipListUser(authData.username ? authData.username : "error"));
    }, [dispatch]);

    const ownedObjects: UserOwnedObjectsProps = {
        groups: reduxGroupList,
        rooms: reduxRoomList,
        equips: reduxEquipList
    };

    const data: ReturnUserObject = reduxPayload.user;
    const isProcessing = reduxPayload.isProcessing || reduxPayload.user === undefined;
    const reduxError = reduxPayload.error ? reduxPayload.error : false;


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
                        {CardList(authData, `${authData.username}-equip`, 3, "equip")}
                    </TabPanel>
                </Grid>
            </Paper>
        </Grid>
    )
};

export default UserAccount;




const buildEquipContentList = (data: EquipListProps) => {
    const retList: Array<CardProps> = data.equip.map((eVal) => {
        return ({
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
                editAllowed: eVal.edit_permissions,
                editButtonDestination: `/equip/${eVal.id}`,
                actionAreaDestination: `/equip/${eVal.id}`,
                mediaURI: eVal.image_url,
                mediaAltText: "TODO - Alt Text Not Stored",
                contentTexts: [{textVariant: "h5", textContent: eVal.name}, {textVariant: "body2", textContent: eVal.headline}, {textVariant: "h5", textContent: eVal.description}]
            }
        })
    }, [])

    return retList;
};