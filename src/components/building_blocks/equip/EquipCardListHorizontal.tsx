// React
import React from 'react';

// Material UI
import {
    Grid,
    Typography
} from "@mui/material";

import { ReturnEquipObject } from '../../../interfaces/edomEquipInterfaces';

import EquipCardSkeleton from './EquipCardSkeleton';
import EquipCard from './EquipCard';
import { NavigateFunction } from 'react-router-dom';

export interface EquipListProps {
    equip: Array<ReturnEquipObject>
    isProcessing: boolean
    error?: boolean
};

const EquipCardListHorizontal = (navigate: NavigateFunction, listid: string, displayqty: number, list: EquipListProps) => {
    const stateLoading = () => {
        const skeletonArray = new Array(displayqty);
        console.log("Loading Skeleton");
        return (
            <React.Fragment>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={`${listid}-${idx}`}>
                            {EquipCardSkeleton()}
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
        console.log("Loading Cards");
        return (
            <React.Fragment>
                {list.equip.map(data => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${listid}-${data.id}`}>
                            {EquipCard(data, navigate)}
                        </Grid>    
                    )
                })}
                {displayMore()}  
            </React.Fragment>
        );
    };

    const displayMore = () => {
        if (list.equip.length > displayqty) {
            return (
                <Grid item xs={12} key={`${listid}-more`}>
                    <p>View More</p>
                </Grid>
            )
        }
    };

    if (list === undefined || list.equip === undefined) {
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

export default EquipCardListHorizontal;