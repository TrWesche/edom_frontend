// React
import React from 'react';

// Material UI
import {
    Grid,
    Typography
} from "@mui/material";

import { EquipObjectProps } from '../../../interfaces/globalInterfaces';

import EquipCardSkeleton from './EquipCardSkeleton';
import EquipCard from './EquipCard';

export interface EquipListProps {
    equip: Array<EquipObjectProps>
    isProcessing: boolean
    error?: boolean
};

const EquipCardListHorizontal = (listid: string, displayqty: number, list: EquipListProps) => {
    const stateLoading = () => {
        const skeletonArray = new Array(displayqty);

        return (
            <React.Fragment>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} key={`${listid}-${idx}`}>
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
        return (
            <React.Fragment>
                {list.equip.map(data => {
                    return (
                        <Grid item xs={4} key={`${listid}-${data.id}`}>
                            {EquipCard(data)}
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

export default EquipCardListHorizontal;