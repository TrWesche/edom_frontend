// React Imports
import React, { ErrorInfo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI Styling System Imports
import { AlertColor, styled } from '@mui/material'

import {
    Grid,
    Typography,
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormHelperText,
    FormControl,
    Button,
    Link,
    Snackbar,
    Alert
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

// Typescript Interface Imports
import { UserObjectProps } from '../../interfaces/globalInterfaces';
import apiEDOM from '../../utils/apiEDOM';
import { sessionStoreToken } from '../../providers/authProvider';


interface FormObjectProps extends UserObjectProps {
    showPassword: boolean
};

interface AlertValueObjectProps {
    open: boolean
    content: string
    severity: AlertColor | undefined
};

const UserRegister = () => {
    const navigate = useNavigate();

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
            // console.log(headers);
            // console.log(data);
            sessionStoreToken(headers['auth-token']);
            // setAlertValues({open: true, text: "Login Successful!", severity: "success"});
            
            navigate('/');
        } catch (error: any) {
            if (error[0] && error[0].length > 0) {
                const errorText = error[0];
                setAlertValues({open: true, content: errorText, severity: "error"});
            } else {
                setAlertValues({open: true, content: "Oops something went wrong.", severity: "error"});
            }
        }
    };
    
    const handleUserLoginRedirect = async (e:  React.SyntheticEvent | Event) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <Grid container spacing={2}>
            {handleAlertOpen()}
            <Grid container spacing={2} className={"container-class"}>
                <Grid item xs={12}>
                <Typography className={"typography-class"} variant="h6" noWrap>
                    Join the EDOM Community
                </Typography>
                </Grid>
            
                <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
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
                            />
                            <FormHelperText id="user-lastname-helper-text">Password*</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                    <Button type="submit" aria-label="create user account" variant="contained" color="primary">
                        Create Account
                    </Button>
                    </Grid>
                </form>
                </Grid>
                <Grid item xs={12}>
                    <Link href="#" onClick={handleUserLoginRedirect}>Existing User?  Login here!</Link>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default UserRegister;