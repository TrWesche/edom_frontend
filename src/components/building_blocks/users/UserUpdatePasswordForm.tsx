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
import { RequestPasswordChange, RequestUserObject } from '../../../interfaces/edomUserInterfaces';

// API Imports
import apiEDOM from '../../../utils/apiEDOM';

// Provider Imports
import { useAuth } from '../../../providers/authProvider';


const RegisterForm = () => {
    const navigate = useNavigate();

    const { authData, updateAuth } = useAuth();

    // Page States
    const onLoadFormValues: RequestPasswordChange = {
        password_e1: '',
        password_e2: '',
        showPassword_e1: false,
        showPassword_e2: false
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
    
    const handleClickShowPassword = (prop: string) => {
        setFormValues({ ...formValues, [prop]: !formValues[prop] });
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // TODO: The Update Password Function will need to be updated to provide a more secure and reliable password changing experience
            // i.e. - Multi-Step Process (Require Password Input before Change can be Made), and Multi Input Check
            let execValue: RequestUserObject = {};
            if (formValues.password_e1 === formValues.password_e2) {
                execValue.password = formValues.password_e1
            } else {
                throw new Error("Password do not match");
            }

            const {headers, data} = await apiEDOM.updateUser(execValue);

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
                                    id="user-password-entry-1"
                                    type={formValues.showPassword_e1 ? 'text' : 'password'}
                                    value={formValues.password_e1}
                                    onChange={handleChange('password_e1')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(e) => {handleClickShowPassword("showPassword_e1")}}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {formValues.showPassword_e1 ? <Visibility /> : <VisibilityOff />}
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

                        <Grid item display={'flex'} flexDirection={'column'} xs={12}>
                            <FormControl className={"form-control-class"} variant="outlined">
                                <OutlinedInput
                                    required
                                    id="user-password-entry-2"
                                    type={formValues.showPassword_e2 ? 'text' : 'password'}
                                    value={formValues.password_e2}
                                    onChange={handleChange('password_e2')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={(e) => {handleClickShowPassword("showPassword_e2")}}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {formValues.showPassword_e2 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    sx={{
                                        backgroundColor: 'primary.light'
                                    }}
                                />
                                <FormHelperText id="user-lastname-helper-text">Repeate Password*</FormHelperText>
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
                                Update Password
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default RegisterForm;