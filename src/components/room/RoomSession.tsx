import {useCallback, useEffect, useLayoutEffect, useState, useReducer} from "react";
import useSignalChannel from "./useSignalChannel";
import useRTCP from "./useRTCPeer";


import {
    Grid,
    Typography
} from "@mui/material"
import { useParams } from "react-router-dom"
import { randomInt } from "crypto";

type RoomParams = {
    roomID: string;
};


const RoomSession = () => {
    const params = useParams();
    // const params = useParams<keyof RoomParams>() as RoomParams;
    // TODO: This will need to be replaced with the UUID coming from the backend or the user information from authentication
    // const userID = randomInt(100000).toString();
    const userID = "test";

    const { sigChannel, msgContents, sendMessage } = useSignalChannel(userID, params.roomID || "error");
    const { rtcp, createDataChannel } = useRTCP(sigChannel, sendMessage, userID, params.roomID || "error");


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be a room!</Typography>
            </Grid>
        </Grid>
    )
}

export default RoomSession;