// Library Imports
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

// Material UI
import {
    Grid,
    Typography
} from "@mui/material";

// Interface Imports
import { ReturnRoomObject } from '../../../interfaces/edomRoomInterfaces';

// Component Imports
import RoomCard from './RoomCard';
import RoomCardSkeleton from './RoomCardSkeleton';

export interface RoomListProps {
    rooms: Array<ReturnRoomObject>
    isProcessing: boolean
    error?: boolean
};

const RoomCardListHorizontal = (navigate: NavigateFunction, listid: string, displayqty: number, list: RoomListProps) => {
    const stateLoading = () => {
        const skeletonArray = new Array(displayqty);

        return (
            <React.Fragment>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={`${listid}-${idx}`}>
                            {RoomCardSkeleton()}
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
                {list.rooms.map(data => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={`${listid}-${data.id}`}>
                            {RoomCard(data, navigate)}
                        </Grid>    
                    )
                })}
                {displayMore()}  
            </React.Fragment>
        );
    };

    const displayMore = () => {
        if (list.rooms.length > displayqty) {
            return (
                <Grid item xs={12} key={`${listid}-more`}>
                    <p>View More</p>
                </Grid>
            )
        }
    };

    if (list === undefined || list.rooms === undefined) {
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

export default RoomCardListHorizontal;