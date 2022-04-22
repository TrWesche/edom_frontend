// Library Imports
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

// Material UI
import {
    Grid,
    Typography
} from "@mui/material";

// Interface Imports
import { ReturnGroupObject } from '../../../interfaces/edomGroupInterfaces';

// Component Imports
import GroupCardSkeleton from "../../tier03/cards/GroupCardSkeleton";
import GroupCard from "../../tier03/cards/GroupCard";

export interface GroupListProps {
    group: Array<ReturnGroupObject>
    isProcessing: boolean
    error?: boolean
};

// TODO: Update with quantity of rows, quantity of columns, pagination/more/none selection
const GroupCardListHorizontal = (navigate: NavigateFunction, listid: string, displayqty: number, list: GroupListProps) => {
    const stateLoading = () => {
        const skeletonArray = new Array(displayqty).fill(0);
        return (
            <React.Fragment>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${listid}-${idx}`}>
                            {GroupCardSkeleton()}
                        </Grid>   
                    );
                })}
            </React.Fragment>
        );
    };

    const stateError = () => {
        return (
            <React.Fragment>
                <Typography>
                    Uh oh... Something went wrong.
                </Typography>
            </React.Fragment>
        );
    };

    const stateLoaded = () => {
        return (
            <React.Fragment>
                {list.group.map(data => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${listid}-${data.id}`}>
                            {GroupCard(data, navigate)}
                        </Grid>    
                    )
                })}
                {displayMore()}  
            </React.Fragment>
        );
    };

    const displayMore = () => {
        if (list.group.length > displayqty) {
            return (
                <Grid item xs={12} key={`${listid}-more`}>
                    <p>View More</p>
                </Grid>
            )
        }
    };

    if (list === undefined || list.group === undefined) {
        return (
            <Grid container item spacing={4} minHeight={310}>
                {stateLoading()}
            </Grid>
        )
    };

    if (list.error) {
        return (
            <Grid container item spacing={4} minHeight={310}>
                {stateError()}
            </Grid>
        );
    } else if (list.isProcessing) {
        return (
            <Grid container item spacing={4} minHeight={310}>
                {stateLoading()}
            </Grid>
        )
    } else if (!list.isProcessing) {
        return (
            <Grid container item spacing={4} minHeight={310}>
                {stateLoaded()}
            </Grid>
        )
    };
};

export default GroupCardListHorizontal;