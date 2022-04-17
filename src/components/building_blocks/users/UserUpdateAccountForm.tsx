// React Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI Styling System Imports
import {
    Grid,
    OutlinedInput,
    FormHelperText,
    FormControl,
    Button,
    Snackbar,
    Alert,
    FormControlLabel,
    Checkbox
} from "@mui/material";

// Typescript Interface Imports
import { AlertValueObjectProps } from '../../../interfaces/globalInterfaces';
import { ReturnUserObject } from '../../../interfaces/edomUserInterfaces';

// API Imports
import apiEDOM from '../../../utils/apiEDOM';

// Provider Imports
import { useAuth } from '../../../providers/authProvider';

// Redux Actions
import { fetchUserProfile } from '../../../redux/actions/actUser';

const UserUpdateAccountForm = () => {
    const navigate = useNavigate();
    const { authData, updateAuth } = useAuth();
    const dispatch = useDispatch();

    // Page States
    const onLoadFormValues: ReturnUserObject = {
        username: '',
        email: '',
        public_email: false,
        first_name: '',
        public_first_name: false,
        last_name: '', 
        public_last_name: false,
        location: '',
        public_location: false
    };
    const [formValues, setFormValues] = useState(onLoadFormValues);

    const onLoadAlertValue: AlertValueObjectProps = {
        open: false,
        content: '',
        severity: 'success'
    };
    const [alertValues, setAlertValues] = useState(onLoadAlertValue);


    // React / Redux Function Instantiations    
    const reduxUser: ReturnUserObject = useSelector((store: RootStateOrAny) => store?.redUser.user);
    useEffect(() => {
        if (authData.username) {
            dispatch(fetchUserProfile(authData.username));
        }
    }, [dispatch]);

    useEffect(() => {
        if (reduxUser) {
            setFormValues(reduxUser);
        };
    }, [reduxUser]);

    // Event Handlers
    const handleAlertClose = (e: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        };
        setAlertValues({...alertValues, open: false});
    };

    const handleAlertOpen = () => {
        return (
          <Snackbar 
            open={alertValues.open} 
            autoHideDuration={6000} 
            onClose={handleAlertClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          >
            <Alert onClose={handleAlertClose} severity={alertValues.severity}>
              {alertValues.content}
            </Alert>
          </Snackbar>
        )
    };

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleChangeCheckbox = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.checked });
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formValues);
        try {
            const {headers, data} = await apiEDOM.updateUser(formValues);

            if (data.errorMessage) {
                throw new Error(data.errorMessage.message)
            };

            navigate('/profile');
        } catch (error: any) {
            console.log(error);

            // if (error[0] && error[0].length > 0) {
            if (error.message) {
                setAlertValues({open: true, content: error.message, severity: "error"});
            } else {
                setAlertValues({open: true, content: "Oops something went wrong.", severity: "error"});
            }
        }
    };

    return (
        <Grid container justifyContent={'center'} marginTop={'1rem'}>
            {handleAlertOpen()}
            <Grid container justifyContent={'center'} className={"container-class"}>
                
                    <form 
                        onSubmit={handleSubmit}
                        className="form-object"
                    >
                        <Grid item xs={12} margin="5px 0">
                            <FormControl className={"form-control-class"}>
                                <OutlinedInput
                                    required
                                    id="username"
                                    value={formValues.username}
                                    onChange={handleChange('username')}
                                    aria-describedby="user-username-helper-text"
                                    inputProps={{
                                        'aria-label': 'username input',
                                    }}
                                />
                                <FormHelperText id="user-username-helper-text">Username*</FormHelperText>
                            </FormControl>
                        </Grid>
                    

                        <Grid container item spacing={4} xs={12}>
                            <Grid item xs={10} lg={11}>
                                <FormControl className={"form-control-class"} variant="outlined">
                                    <OutlinedInput
                                        required
                                        id="user-email"
                                        value={formValues.email}
                                        onChange={handleChange('email')}
                                        aria-describedby="user-email-helper-text"
                                        inputProps={{
                                            'aria-label': 'email input',
                                        }}
                                    />
                                    <FormHelperText id="user-email-helper-text">Email*</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} lg={1}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            id="user-email-public"
                                            checked={formValues.public_email}
                                            onChange={handleChangeCheckbox('public_email')}
                                            inputProps={{'aria-label': 'public email toggle'}}
                                        />
                                    } 
                                    label="Public" 
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={4} xs={12}>
                            <Grid item xs={10} lg={11}>
                                <FormControl className={"form-control-class"} variant="outlined">
                                    <OutlinedInput
                                        id="user-firstname"
                                        value={formValues.first_name ? formValues.first_name : ""}
                                        onChange={handleChange('first_name')}
                                        aria-describedby="user-firstname-helper-text"
                                        inputProps={{
                                            'aria-label': 'first name input',
                                        }}
                                    />
                                    <FormHelperText id="user-firstname-helper-text">First Name</FormHelperText>
                                </FormControl>
                                </Grid>
                            <Grid item xs={2} lg={1}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            id="user-first-name-public"
                                            checked={formValues.public_first_name}
                                            onChange={handleChangeCheckbox('public_first_name')}
                                            inputProps={{'aria-label': 'public first name toggle'}}
                                        />
                                    } 
                                    label="Public" 
                                />
                            </Grid>
                        </Grid>


                        <Grid container item spacing={4} xs={12}>
                            <Grid item xs={10} lg={11}>
                                <FormControl className={"form-control-class"} variant="outlined">
                                    <OutlinedInput
                                        id="user-lastname"
                                        value={formValues.last_name ? formValues.last_name : ""}
                                        onChange={handleChange('last_name')}
                                        aria-describedby="user-lastname-helper-text"
                                        inputProps={{
                                            'aria-label': 'last name input',
                                        }}
                                    />
                                    <FormHelperText id="user-lastname-helper-text">Last Name</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} lg={1}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            id="user-last-name-public"
                                            checked={formValues.public_last_name}
                                            onChange={handleChangeCheckbox('public_last_name')}
                                            inputProps={{'aria-label': 'public last name toggle'}}
                                        />
                                    } 
                                    label="Public" 
                                />
                            </Grid>
                        </Grid>
                        

                        <Grid container item spacing={4} xs={12}>
                            <Grid item xs={10} lg={11}>
                                <FormControl className={"form-control-class"} variant="outlined">
                                    <OutlinedInput
                                        id="user-location"
                                        value={formValues.location ? formValues.location : ""}
                                        onChange={handleChange('location')}
                                        aria-describedby="user-location-helper-text"
                                        inputProps={{
                                            'aria-label': 'location input',
                                        }}
                                    />
                                    <FormHelperText id="user-location-helper-text">Location</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} lg={1}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            id="user-location-public"
                                            checked={formValues.public_location}
                                            onChange={handleChangeCheckbox('public_location')}
                                            inputProps={{'aria-label': 'public location toggle'}}
                                        />
                                    } 
                                    label="Public" 
                                />
                            </Grid>
                        </Grid>

                        <Grid item display={'flex'} justifyContent={'center'} xs={12}>
                            <Button 
                                type="submit" 
                                aria-label="user register" 
                                variant="contained" 
                                color="primary"
                                sx={{
                                    margin: '0.25rem',
                                    width: '200px'
                                }}
                            >
                                Update Account
                            </Button>
                        </Grid>
                    </form>

            </Grid>
        </Grid>
    )
};

export default UserUpdateAccountForm;