// Library Imports
import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// Material UI
import {
    Grid,
    Typography
} from "@mui/material";

// Interface Imports
import { ReturnEquipObject } from '../../../interfaces/edomEquipInterfaces';
import { ReturnUserObject } from '../../../interfaces/edomUserInterfaces';
import { ReturnRoomObject } from '../../../interfaces/edomRoomInterfaces';
import { ReturnGroupObject } from '../../../interfaces/edomGroupInterfaces';

// Component Imports
import CardListStackedSkeleton from '../../tier03/cardlist/CardListStackedSkeleton';

import EquipCardStackable from '../../tier03/cards/EquipCardStackable';

import { fetchEquipListUser } from '../../../redux/actions/actEquipList';
import { authToken } from '../../../providers/authProvider';


interface CardListStackedProps {
    equip?: Array<ReturnEquipObject>
    users?: Array<ReturnUserObject>
    rooms?: Array<ReturnRoomObject> 
    group?: Array<ReturnGroupObject>
    isProcessing: boolean
    error?: boolean
};

const CardListStacked = (authData: authToken, listid: string, displayqty: number, listType: string) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (authData.username) {
            switch (listType) {
                case "equip": 
                    dispatch(fetchEquipListUser(authData.username));
                    break;
                default:
            }
        }
    }, [dispatch])

    const renderData: CardListStackedProps | undefined = useSelector((store: RootStateOrAny) => {
        switch (listType) {
            case "equip":
                return store?.redEquipList
            default:
                return undefined
        }
    });

    // console.log(renderData);

    const stateLoading = () => {
        console.log("Loading");
        const skeletonArray = new Array(displayqty).fill(0);
        return (
            <React.Fragment>
                {skeletonArray.map((val, idx) => {
                    return (
                        <Grid item xs={12} key={`${listid}-${idx}`}>
                            {CardListStackedSkeleton()}
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
        console.log("Loaded");
        switch (listType) {
            case "equip":
                if (renderData?.equip) { // && isEquip(renderData)) {
                    return renderEquipCards(listid, navigate, renderData.equip);
                };
                break;
            default:
        }
    }

    // const displayMore = () => {
    //     if (list.equip.length > displayqty) {
    //         return (
    //             <Grid item xs={12} key={`${listid}-more`}>
    //                 <p>View More</p>
    //             </Grid>
    //         )
    //     }
    // };

    if (renderData === undefined || renderData.isProcessing === true) {
        return (
            <Grid container item spacing={4} minHeight={310}>
                {stateLoading()}
            </Grid>
        )
    };

    if (renderData.error) {
        return (
            <Grid container item spacing={4} minHeight={310}>
                {stateError()}
            </Grid>
        );
    } else if (renderData.isProcessing) {
        return (
            <Grid container item spacing={4} minHeight={310}>
                {stateLoading()}
            </Grid>
        )
    } else if (!renderData.isProcessing) {
        return (
            <Grid container item spacing={4} minHeight={310}>
                {stateLoaded()}
            </Grid>
        )
    };
};

export default CardListStacked;


// const isEquip = (equipList: any): equipList is CardListStackedProps =>
//   (equipList as CardListStackedProps).equip !== undefined;


const renderEquipCards = (listid: string, navigate: NavigateFunction, data: Array<ReturnEquipObject>) => {
    return (
        <React.Fragment>
            {data.map(card => {
                return (
                    <Grid item xs={12} key={`${listid}-${card.id}`}>
                        {EquipCardStackable(card, navigate)}
                    </Grid>    
                )
            })}
        </React.Fragment>
    )
}