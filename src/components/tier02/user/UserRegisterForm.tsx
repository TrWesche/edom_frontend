// React Imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI Styling System Imports

import {
    Grid,
    IconButton,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    FormControl,
    Button,
    Snackbar,
    Alert
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

// Typescript Interface Imports
import { AlertValueObjectProps } from '../../../interfaces/globalInterfaces';
import { RequestUserObject } from '../../../interfaces/edomUserInterfaces';

// API Imports
import apiEDOM from '../../../utils/apiEDOM';

// Provider Imports
import { useAuth } from '../../../providers/authProvider';


interface FormObjectProps extends RequestUserObject {
    showPassword: boolean
};


const RegisterForm = () => {
    const navigate = useNavigate();

    const { authData, updateAuth } = useAuth();

    // Page States
    const onLoadFormValues: FormObjectProps = {
        username: '',
        email: '',
        first_name: '',
        last_name: '', 
        password: '',
        showPassword: false
    };
    const [formValues, setFormValues] = useState(onLoadFormValues);

    const onLoadAlertValue: AlertValueObjectProps = {
        open: false,
        content: '',
        severity: 'success'
    };
    const [alertValues, setAlertValues] = useState(onLoadAlertValue);


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
    
    const handleClickShowPassword = () => {
        setFormValues({ ...formValues, showPassword: !formValues.showPassword });
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const {headers, data} = await apiEDOM.registerUser(formValues);

            console.log(data);

            if (!updateAuth) {
                console.log("Error: Auth Handling Function Returned Undefined")
            } else {
                updateAuth();
            }

            if (data.errorMessage) {
                throw new Error(data.errorMessage.message)
            };

            navigate('/');
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
            <Grid container spacing={2} className={"container-class"}>
                <Grid container item xs={12} justifyContent={'center'}>
                    <form onSubmit={handleSubmit}>
                        <Grid item display={'flex'} flexDirection={'column'} xs={12}>
                            <FormControl className={"form-control-class"} variant="outlined">
                                <OutlinedInput
                                    required
                                    id="username"
                                    value={formValues.username}
                                    onChange={handleChange('username')}
                                    aria-describedby="user-username-helper-text"
                                    inputProps={{
                                        'aria-label': 'username',
                                    }}
                                    sx={{
                                        backgroundColor: 'primary.light'
                                    }}
                                />
                                <FormHelperText id="user-username-helper-text">Username*</FormHelperText>
                            </FormControl>

                            <FormControl className={"form-control-class"} variant="outlined">
                                <OutlinedInput
                                    required
                                    id="user-email"
                                    value={formValues.email}
                                    onChange={handleChange('email')}
                                    aria-describedby="user-email-helper-text"
                                    inputProps={{
                                        'aria-label': 'email',
                                    }}
                                    sx={{
                                        backgroundColor: 'primary.light'
                                    }}
                                />
                                <FormHelperText id="user-email-helper-text">Email*</FormHelperText>
                            </FormControl>

                            <FormControl className={"form-control-class"} variant="outlined">
                                <OutlinedInput
                                    id="user-firstname"
                                    value={formValues.first_name}
                                    onChange={handleChange('first_name')}
                                    aria-describedby="user-firstname-helper-text"
                                    inputProps={{
                                        'aria-label': 'first name',
                                    }}
                                    sx={{
                                        backgroundColor: 'primary.light'
                                    }}
                                />
                                <FormHelperText id="user-firstname-helper-text">First Name</FormHelperText>
                            </FormControl>

                            <FormControl className={"form-control-class"} variant="outlined">
                                <OutlinedInput
                                    id="user-lastname"
                                    value={formValues.last_name}
                                    onChange={handleChange('last_name')}
                                    aria-describedby="user-lastname-helper-text"
                                    inputProps={{
                                        'aria-label': 'last name',
                                    }}
                                    sx={{
                                        backgroundColor: 'primary.light'
                                    }}
                                />
                                <FormHelperText id="user-lastname-helper-text">Last Name</FormHelperText>
                            </FormControl>

                            <FormControl className={"form-control-class"} variant="outlined">
                                <OutlinedInput
                                    required
                                    id="user-password"
                                    type={formValues.showPassword ? 'text' : 'password'}
                                    value={formValues.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {formValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    sx={{
                                        backgroundColor: 'primary.light'
                                    }}
                                />
                                <FormHelperText id="user-lastname-helper-text">Password*</FormHelperText>
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
                                Create Account
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default RegisterForm;