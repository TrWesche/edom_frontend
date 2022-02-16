// React
import React from 'react';

// Material UI
import {
    Grid,
    Typography
} from "@mui/material";

import { GroupObjectProps } from '../../../interfaces/globalInterfaces';

import GroupCardSkeleton from "./GroupCardSkeleton";
import GroupCard from "./GroupCard";

export interface GroupListProps {
    group: Array<GroupObjectProps>
    isProcessing: boolean
    error?: boolean
};

const GroupCardListHorizontal = (listid: string, displayqty: number, list: GroupListProps) => {
    const stateLoading = () => {
        const skeletonArray = new Array(displayqty);

        return (
            <React.Fragment>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} key={`${listid}-${idx}`}>
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
                        <Grid item xs={4} key={`${listid}-${data.id}`}>
                            {GroupCard(data)}
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
            <Grid container item>
                {stateLoading()}
            </Grid>
        )
    };

    if (list.error) {
        return (
            <Grid container item>
                {stateError()}
            </Grid>
        );
    } else if (list.isProcessing) {
        return (
            <Grid container item>
                {stateLoading()}
            </Grid>
        )
    } else if (!list.isProcessing) {
        return (
            <Grid container item>
                {stateLoaded()}
            </Grid>
        )
    };
};

export default GroupCardListHorizontal;