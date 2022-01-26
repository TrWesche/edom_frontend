// React Imports
import React, { useState, useEffect, useContext } from 'react';
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
import { UserObjectProps } from '../../interfaces/globalInterfaces';
import apiEDOM from '../../utils/apiEDOM';
import { useAuth } from '../../providers/authProvider';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';


const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((store: RootStateOrAny) => store?.currentUser);

    const { authData, handleAuth } = useAuth();

    useEffect(() => {

    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Member Profile Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Stuff about the individual member or the team!</Typography>
            </Grid>
        </Grid>
    )
};

export default UserProfile;