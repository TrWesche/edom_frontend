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

// Interface Imports
import { fetchGroupList } from '../../../redux/actions/actGroupList';

import GroupCardListHorizontal, { GroupListProps } from "../../tier02/cardlist/GroupCardListHorizontal";



interface ReduxDataPayload {
    groups: GroupListProps
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

        // setAlertValues({open: true, content: "Filter Submit Clicked", severity: "info"});

//         try {
//             await apiEDOM.loginUser(formValues);
// \
//             if (!updateAuth) {
//                 console.log("Error: Auth Handling Function Returned Undefined")
//             } else {
//                 updateAuth();
//             }
// \
//             navigate('/');
//         } catch (error: any) {
//             if (error[0] && error[0].length > 0) {
//                 const errorText = error[0];
//                 setAlertValues({open: true, content: errorText, severity: "error"});
//             } else {
//                 setAlertValues({open: true, content: "Oops something went wrong.", severity: "error"});
//             }
//         }
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


const ExploreGroupsHeader = () => {
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
        reduxData: ReduxDataPayload}) => {
    const { authData, navigate, alertSetter, reduxData } = props; 


    const pageLoaded = () => {
        return (
            <React.Fragment>
                {ExploreGroupsHeader()}
                <Grid item container width={'100%'} margin={'2rem 0 0 0'}>
                    <Typography variant='h4' color={'text.primary'}>Groups</Typography>
                </Grid>
                {GroupCardListHorizontal(navigate, "explore-groups", 15, reduxData.groups)}
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


const ExploreGroups = () => {
    // React / Redux Function Instantiations
    const navigate = useNavigate();

    // Context Providers
    const { alertSetter } = useAlert();
    const { authData } = useAuth();


    // React / Redux Function Instantiations
    const dispatch = useDispatch();
    
    const reduxGroupList: GroupListProps = useSelector((store: RootStateOrAny) => store?.redGroupList);

    useEffect(() => {
        dispatch(fetchGroupList());
    }, [dispatch]);

    const reduxData: ReduxDataPayload = {
        groups: reduxGroupList
    };

    return (
        <Grid container spacing={2} justifyContent={'center'} width={'100%'}>
            <PageLoadHandler 
                authData={authData}
                navigate={navigate}
                alertSetter={alertSetter}
                reduxData={reduxData}
            />
        </Grid>
    )
}

export default ExploreGroups;