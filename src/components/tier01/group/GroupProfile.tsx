// React
import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Typography,
    Avatar,
    Paper
} from "@mui/material"


// Providers
import { authToken, useAuth } from '../../../providers/authProvider';
import { useAlert } from '../../../providers/alertProvider';

// Component Imports
import CardList from '../../tier02/cardlist/CardList';

// Component Function Imports
import { buildEquipCardContentList, buildRoomCardContentList, buildUserCardContentList } from "../../tier02/cardlist/CardListFunctions";

// Interface Imports
import { CardListProps, CardListRenderProps, EquipListProps, RoomListProps, UserListProps } from '../../tier02/cardlist/CardListInterfaces';
import { ReturnGroupObject } from '../../../interfaces/edomGroupInterfaces';
import { CardSettingProps } from "../../tier03/cards/_interfaceCardProps";

// Redux Action Imports
import { fetchEquipListGroup } from '../../../redux/actions/actEquipList';
import { fetchGroupProfile } from '../../../redux/actions/actGroup';
import { fetchRoomListGroup } from '../../../redux/actions/actRoomList';
import { fetchUserListGroup } from '../../../redux/actions/actUserList';


const CardRenderProps: CardListRenderProps = {
    xlRows: 1,
    lgRows: 1,
    mdRows: 2,
    smRows: 3,
    xsRows: 6,
    xlColumns: 4,
    lgColumns: 4,
    mdColumns: 3,
    smColumns: 2,
    xsColumns: 1
};

const CardSettings: CardSettingProps = {
    displayEdit: true,
    displayMedia: true,
    mediaHeight: 200,
    displayContent: true,
    contentHeight:  100,
    displayActions: false,
    actionHeight: 100,
    enableActionArea: true
};

interface ReduxDataPayload {
    group: ReturnGroupObject
    user: CardListProps
    room: CardListProps
    equip: CardListProps
};


const GroupProfileHeader = (props: {navigate: NavigateFunction, data: ReturnGroupObject}) => {
    const {data, navigate} = props;

    return (
        <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={3}>
                    <Avatar 
                        alt="User"
                        src={data.image_url ? data.image_url : `https://th.bing.com/th/id/OIP.V4WfwwbPOAKnHebgSFbmNwHaGL?pid=ImgDet&rs=1`} 
                        sx={{ width: 152, height: 152 }}
                    />
                </Grid>

                <Grid item xs={9} justifyContent={'end'}>
                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        padding={"0.25rem"}
                        textAlign={"right"}
                    >
                        {data.name}
                    </Typography>

                    <Typography 
                        color={'secondary.dark'} 
                        variant='h5' 
                        margin={"1rem 0rem 0rem 0rem"}
                        padding={"0.25rem"}
                        textAlign={"right"}
                    >
                        {data.location}
                    </Typography>
                </Grid>

                {data.headline ? 
                    <Grid item xs={12}>
                        <Typography 
                            color={'primary.light'} 
                            variant='h6' 
                            margin={"1.5rem 0rem 0rem 0rem"}
                            padding={"0.25rem"}
                        >
                            {data.headline}
                        </Typography>
                    </Grid> 
                    :
                    <React.Fragment></React.Fragment>
                }

                {data.description ? 
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Typography 
                                color={'secondary.dark'} 
                                variant='h5' 
                                margin={"1rem 0rem 0rem 0rem"}
                                padding={"0 0.25rem"}
                                textAlign={"left"}
                            >
                                About
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography 
                                color={'secondary.light'} 
                                variant='body1' 
                                margin={"0rem 0rem 0rem 0rem"}
                                padding={"0 0.25rem 0.25rem 0.25rem"}
                            >
                                {data.description}
                            </Typography>
                        </Grid>
                    </React.Fragment>
                    :
                    <React.Fragment></React.Fragment>
                }
            </Grid>
        </Paper>
    )
};

const GroupUserSection = (props: {renderData: CardListProps}) => {
    const {renderData} = props;

    if (renderData && renderData.cardContent.length !== 0) {
        return (
            <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant='h4' color={'text.primary'}>Users</Typography>
                </Grid>
                <Grid item container xs={12} margin={"1rem 0rem 0rem 0rem"}>
                    <CardList 
                        listid={renderData.listid}
                        cardType={renderData.cardType}
                        navigate={renderData.navigate}
                        cardContent={renderData.cardContent}
                        renderConfig={renderData.renderConfig}
                        displayIsProcessing={renderData.displayIsProcessing}
                        displayError={renderData.displayError}
                    />
                </Grid>
            </Grid>
        </Paper>
        )
    } else {
        return <React.Fragment />
    };
};

const GroupRoomSection = (props: {renderData: CardListProps}) => {
    const {renderData} = props;

    if (renderData && renderData.cardContent.length !== 0) {
        return (
            <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant='h4' color={'text.primary'}>Rooms</Typography>
                </Grid>
                <Grid item container xs={12} margin={"1rem 0rem 0rem 0rem"}>
                    <CardList 
                        listid={renderData.listid}
                        cardType={renderData.cardType}
                        navigate={renderData.navigate}
                        cardContent={renderData.cardContent}
                        renderConfig={renderData.renderConfig}
                        displayIsProcessing={renderData.displayIsProcessing}
                        displayError={renderData.displayError}
                    />
                </Grid>
            </Grid>
        </Paper>
        )
    } else {
        return <React.Fragment />
    };
};

const GroupEquipSection = (props: {renderData: CardListProps}) => {
    const {renderData} = props;

    if (renderData && renderData.cardContent.length !== 0) {
        return (
            <Paper sx={{ display: 'flex', m: 1, width: '100%', alignItems: 'center', padding: '1.5rem' }}>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography variant='h4' color={'text.primary'}>Equipment</Typography>
                </Grid>
                <Grid item container xs={12} margin={"1rem 0rem 0rem 0rem"}>
                    <CardList 
                        listid={renderData.listid}
                        cardType={renderData.cardType}
                        navigate={renderData.navigate}
                        cardContent={renderData.cardContent}
                        renderConfig={renderData.renderConfig}
                        displayIsProcessing={renderData.displayIsProcessing}
                        displayError={renderData.displayError}
                    />
                </Grid>
            </Grid>
        </Paper>
        )
    } else {
        return <React.Fragment />
    };
};

const PageLoadHandler = (props: {
    authData: authToken, 
    navigate: NavigateFunction,
    alertSetter: Function | undefined, 
    reduxData: ReduxDataPayload}) => {
    const { authData, navigate, alertSetter, reduxData } = props; 


    const pageLoaded = () => {
        return (
            <React.Fragment> 
                <GroupProfileHeader navigate={navigate} data={reduxData.group} />
                <GroupUserSection renderData={reduxData.user} />
                <GroupRoomSection renderData={reduxData.room} />
                <GroupEquipSection renderData={reduxData.equip} />
            </React.Fragment>
            
        );
    };


    // User Logged In Check
    if (!authData.logged_in && authData.init) {
        if (alertSetter) {
            alertSetter({open: true, content: "Please Login to Continue.", severity: "error"})
        };
        navigate('/');
    };

    return (
        <React.Fragment>
            {pageLoaded()}
        </React.Fragment>
    );
};



const GroupProfile = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();

    const params: any = useParams();

    // React / Redux Function Instantiations
    const dispatch = useDispatch();

    const reduxGroup: ReturnGroupObject = useSelector((store: RootStateOrAny) => store?.redGroup);
    const reduxUserList: UserListProps = useSelector((store: RootStateOrAny) => store?.redUserList);
    const reduxRoomList: RoomListProps = useSelector((store: RootStateOrAny) => store?.redRoomList);
    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);

    const userCardContentList = buildUserCardContentList(CardSettings, reduxUserList);
    const roomCardContentList = buildRoomCardContentList(CardSettings, reduxRoomList);
    const equipCardContentList = buildEquipCardContentList(CardSettings,reduxEquipList);


    const userCardListData: CardListProps = {
        listid: `${params.groupID}-user-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: userCardContentList,
        renderConfig: CardRenderProps,
        displayIsProcessing: reduxUserList.isProcessing,
        displayError: reduxUserList.error
    };

    const roomCardListData: CardListProps = {
        listid: `${params.groupID}-room-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: roomCardContentList,
        renderConfig: CardRenderProps,
        displayIsProcessing: reduxRoomList.isProcessing,
        displayError: reduxRoomList.error
    };

    const equipCardListData: CardListProps = {
        listid: `${params.groupID}-equip-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: equipCardContentList,
        renderConfig: CardRenderProps,
        displayIsProcessing: reduxEquipList.isProcessing,
        displayError: reduxEquipList.error
    };


    useEffect(() => {
        dispatch(fetchGroupProfile(params.groupID));
        dispatch(fetchUserListGroup([{key: "gid", value: params.groupID}]));
        dispatch(fetchRoomListGroup([{key: "gid", value: params.groupID}]));
        dispatch(fetchEquipListGroup([{key: "gid", value: params.groupID}]));
    }, [dispatch]);

    const reduxData: ReduxDataPayload = {
        group: reduxGroup,
        user: userCardListData,
        room: roomCardListData,
        equip: equipCardListData
    };

    return (
        <Grid container spacing={2} justifyContent={'center'} width={'100%'}>
            <Grid item container justifyContent={'center'} maxWidth={'1200px'}>
                <PageLoadHandler 
                    authData={authData}
                    navigate={navigate}
                    alertSetter={alertSetter}
                    reduxData={reduxData}
                />
            </Grid>
        </Grid>
    )
};

export default GroupProfile;