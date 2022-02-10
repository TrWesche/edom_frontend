// React Imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI Styling System Imports
import { AlertColor, styled } from '@mui/material'

import {
    Grid,
    Typography,
    IconButton,
    OutlinedInput,
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
import { UserLoginProps } from '../../interfaces/globalInterfaces';
import apiEDOM from '../../utils/apiEDOM';
import { useAuth } from '../../providers/authProvider';



interface FormObjectProps extends UserLoginProps {
    showPassword: boolean
};

interface AlertValueObjectProps {
    open: boolean
    content: string
    severity: AlertColor | undefined
};


const UserLogin = () => {
    const navigate = useNavigate();

    const { authData, updateAuth } = useAuth();

    // Page States
    const onLoadFormValues: FormObjectProps = {
        username: '', 
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
            await apiEDOM.loginUser(formValues);
            // console.log(headers);
            // console.log(data);
            // sessionStoreToken(headers['auth-token']);
            
            if (!updateAuth) {
                console.log("Error: Auth Handling Function Returned Undefined")
            } else {
                updateAuth();
            }
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

    return (
        <Grid container justifyContent={'center'} marginTop={'1rem'}>
            {handleAlertOpen()}
            <Grid container className={"container-class"}>
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
                                <FormHelperText id="user-username-helper-text">Username</FormHelperText>
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
                                <FormHelperText id="user-lastname-helper-text">Password</FormHelperText>
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
                                Sign In
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default UserLogin;