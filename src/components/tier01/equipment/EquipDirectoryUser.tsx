// React
import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Typography,
    Box,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button
} from "@mui/material"


// Providers
import { authToken, useAuth } from '../../../providers/authProvider';
import { useAlert } from '../../../providers/alertProvider';

// Component Imports
import CardList from '../../tier02/cardlist/CardList';

// Interface Imports
import { CardListProps, CardListRenderProps, EquipListProps } from '../../tier02/cardlist/CardListInterfaces';

// Redux Actions
import { fetchEquipListUser } from '../../../redux/actions/actEquipList';


const EquipDirectoryCardProps: CardListRenderProps = {
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


const CheckboxesGroup = () => {
    const [state, setState] = React.useState({
      filter1: true,
      filter2: false,
      filter3: false,
    });
  
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Filter Submit Clicked");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };
  
    const { filter1, filter2, filter3 } = state;
  
    return (
        <Box sx={{ display: 'flex' }}>
            <form onSubmit={handleSubmit}>
                <Grid item display={'flex'} flexDirection={'column'} xs={12}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Filter</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                            control={
                                <Checkbox checked={filter1} onChange={handleChange} name="filter1" />
                            }
                            label="Filter 1"
                            />
                            <FormControlLabel
                            control={
                                <Checkbox checked={filter2} onChange={handleChange} name="filter2" />
                            }
                            label="Filter 2"
                            />
                            <FormControlLabel
                            control={
                                <Checkbox checked={filter3} onChange={handleChange} name="filter3" />
                            }
                            label="Filter 3"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>

                <Grid item display={'flex'} justifyContent={'center'} xs={12}>
                    <Button 
                        type="submit" 
                        aria-label="user login" 
                        variant="contained" 
                        color="primary"
                        sx={{
                            margin: '0.25rem',
                            width: '150px'
                        }}
                    >
                        Apply
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}


const EquipDirectoryUserHeader = () => {
    return (
        <React.Fragment>
            <Grid item container width={'100%'} margin={'0 0 2rem 0'}>
                <Grid item xs={12} md={7} display={'flex'} justifyContent={'center'}>
                    <img 
                        src='https://picturepark.com/data/cutting-edge-large.png'
                        alt='Hero'
                        height='400px'
                    />
                </Grid>

                <Grid item xs={12} md={5} flexDirection='column' display={'flex'} justifyContent={'center'}>
                    {CheckboxesGroup()}
                </Grid>
            </Grid>
        </React.Fragment>
    )
};


const PageLoadHandler = (props: {
        authData: authToken, 
        navigate: NavigateFunction,
        alertSetter: Function | undefined, 
        renderData: CardListProps}) => {
    const { authData, navigate, alertSetter, renderData } = props; 

    const pageLoaded = () => {
        return (
            <React.Fragment>
                {EquipDirectoryUserHeader()}
                <Grid item container width={'100%'} margin={'2rem 0 0 0'}>
                    <Typography variant='h4' color={'text.primary'}>Equipment</Typography>
                </Grid>
                <CardList 
                    listid={renderData.listid}
                    cardType={renderData.cardType}
                    navigate={renderData.navigate}
                    cardContent={renderData.cardContent}
                    renderConfig={renderData.renderConfig}
                    displayIsProcessing={renderData.displayIsProcessing}
                    displayError={renderData.displayError}
                />
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


const EquipDirectoryUser = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();

    const reduxEquipList: EquipListProps = useSelector((store: RootStateOrAny) => store?.redEquipList);
    const equipCardContentList = buildEquipContentList(reduxEquipList);

    const equipCardListData: CardListProps = {
        listid: `${authData.username}-equip-list`,
        cardType: "horizontal",
        navigate: navigate,
        cardContent: equipCardContentList,
        renderConfig: EquipDirectoryCardProps,
        displayIsProcessing: reduxEquipList.isProcessing,
        displayError: reduxEquipList.error
    };


    useEffect(() => {
        dispatch(fetchEquipListUser(authData.username ? authData.username : "error"));
    }, [dispatch, authData.username]);


    return (
        <Grid container spacing={2} justifyContent={'center'} width={'100%'}>
            <PageLoadHandler 
                authData={authData}
                navigate={navigate}
                alertSetter={alertSetter}
                renderData={equipCardListData}
            />
        </Grid>
    )
}

export default EquipDirectoryUser;




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
                mediaHeight: 200,
                // mediaWidth: 200,
                displayContent: true,
                contentHeight:  100,
                displayActions: false,
                actionHeight: 100,
                enableActionArea: true
            },
            data: {
                editAllowed: element.edit_permissions || false,
                editButtonDestination: `/equip/${element.id}` || `#`,
                actionAreaDestination: `/equip/${element.id}` || `#`,
                mediaURI: element.image_url || `Image Not Found`,
                mediaAltText: "TODO - Alt Text Not Stored",
                contentTexts: [
                    {textVariant: "h5", textContent: element.name}, 
                    {textVariant: "body2", textContent: element.headline}, 
                    // {textVariant: "body2", textContent: element.description}
                ]
            }
        })
    });

    return retList;
};