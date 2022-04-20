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
import { RequestUserObject } from '../../../interfaces/edomUserInterfaces';

// API Imports
import apiEDOM from '../../../utils/apiEDOM';

// Provider Imports
import { useAuth } from '../../../providers/authProvider';

// Redux Actions
import { fetchUserProfile } from '../../../redux/actions/actUser';

const UserUpdateProfileForm = () => {
    const navigate = useNavigate();
    const { authData, updateAuth } = useAuth();
    const dispatch = useDispatch();

    // Page States
    const onLoadFormValues: RequestUserObject = {
        headline: "",
        about: "",
        image_url: "",
        public_profile: false
    };
    const [formValues, setFormValues] = useState(onLoadFormValues);

    const onLoadAlertValue: AlertValueObjectProps = {
        open: false,
        content: '',
        severity: 'success'
    };
    const [alertValues, setAlertValues] = useState(onLoadAlertValue);


    // React / Redux Function Instantiations    
    const reduxUser: RequestUserObject = useSelector((store: RootStateOrAny) => store?.redUser.user);
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
        console.log(formValues)
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const {headers, data} = await apiEDOM.updateUser(formValues);

            if (data.errorMessage) {
                throw new Error(data.errorMessage.message)
            };

            navigate('/dm/account');
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
                        <Grid container item spacing={4} xs={12}>
                            <Grid item xs={9} lg={10}>
                                <FormControl className={"form-control-class"} variant="outlined">
                                    <OutlinedInput
                                        id="user-image-url"
                                        value={formValues.image_url}
                                        onChange={handleChange('image_url')}
                                        aria-describedby="user-image-url-helper-text"
                                        inputProps={{
                                            'aria-label': 'image url input',
                                        }}
                                    />
                                    <FormHelperText id="user-image-url-helper-text">Profile Picture</FormHelperText>
                                </FormControl>
                                </Grid>
                            <Grid item xs={3} lg={2}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            id="user-profile-public"
                                            checked={formValues.public_profile}
                                            onChange={handleChangeCheckbox('public_profile')}
                                            inputProps={{'aria-label': 'public profile toggle'}}
                                        />
                                    } 
                                    label="Public Profile" 
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} margin="5px 0">
                            <FormControl className={"form-control-class"}>
                                <OutlinedInput
                                    required
                                    id="headline"
                                    value={formValues.headline}
                                    onChange={handleChange('headline')}
                                    aria-describedby="user-headline-helper-text"
                                    inputProps={{
                                        'aria-label': 'headline input',
                                    }}
                                    multiline
                                    maxRows={4}
                                />
                                <FormHelperText id="user-headline-helper-text">Headline</FormHelperText>
                            </FormControl>
                        </Grid>
                    
                        <Grid item xs={12} margin="5px 0">
                            <FormControl className={"form-control-class"} variant="outlined">
                                <OutlinedInput
                                    required
                                    id="user-about"
                                    value={formValues.about}
                                    onChange={handleChange('about')}
                                    aria-describedby="user-about-helper-text"
                                    inputProps={{
                                        'aria-label': 'about input',
                                    }}
                                    multiline
                                    maxRows={4}
                                />
                                <FormHelperText id="user-about-helper-text">About</FormHelperText>
                            </FormControl>
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
                                Update Profile
                            </Button>
                        </Grid>
                    </form>

            </Grid>
        </Grid>
    )
};

export default UserUpdateProfileForm;