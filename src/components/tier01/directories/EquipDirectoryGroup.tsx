// React
// import React, { useEffect } from 'react';

// Redux
// import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

import {
    Grid,
    // Button,
    Typography
} from "@mui/material"

// Providers
// import { authToken } from '../../../providers/authProvider';

// import HandleButtonClick from '../../../utils/HandleButtonClick';

// Interface Imports
// import { fetchGroupList } from '../../redux/actions/actGroupList';


const EquipDirectoryGroup = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be the Group's Equipment Directory Page!</Typography>
                <Typography>How Exciting!</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 1</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 2</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 3</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 4</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot 5</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Robot n</Typography>
            </Grid>
        </Grid>
    )
};

export default EquipDirectoryGroup;