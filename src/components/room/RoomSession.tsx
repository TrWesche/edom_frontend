// https://blog.logrocket.com/creating-chat-application-with-webrtc/
// https://github.com/jkithome/simple-webrtc-chat-app/blob/master/src/Chat.js

import {useCallback, useEffect, useLayoutEffect, useState, useReducer } from "react";
import useSignalChannel from "./useSignalChannel";
import useRTCP from "./useRTCPeer";
import * as msgTypes from "./_wrtcSigChMsgTypes.json";

import {
    Grid,
    Typography
} from "@mui/material"
import { useParams } from "react-router-dom"
import { SIGNAL_SERVER_API_URL } from "../../config/config";


export interface SigChMessageProps {
    type: string,
    roomID?: string,
    srcUID?: string,
    trgtUID?: string,
    offer?: RTCSessionDescriptionInit,
    answer?: RTCSessionDescriptionInit,
    ice?: RTCIceCandidateType 
}


// export interface RoomProps {
//     userID: string,
//     roomID?: string
// }

export interface UserProps {
    userID: string | undefined,
    userName: string | undefined
}

const RoomSession = () => {
    const params = useParams();

    const [userData, setUserData] = useState<UserProps>({userID: undefined, userName: undefined});
    const [rtcpState, setRTCPState] = useState("waiting");
    const [sigChannelState, setSigChannelState] = useState("initializing");
    const [sigChMsgQueue, setSigChMsgQueue] = useState<Array<SigChMessageProps>>([]);


    // const params = useParams<keyof RoomParams>() as RoomParams;
    // TODO: This will need to be replaced with the UUID coming from the backend or the user information from authentication
    // const userID = randomInt(100000).toString();
    
    // const getUser = () => {
    //     const response = await fetch(`${SIGNAL_SERVER_API_URL}/room/${params.roomID}`);
    //     const data = await response.json();
    //     return data;
    // };
    useEffect(() => {
        if (userData.userID === undefined) {
            const getUserID = async ()  => {
                // console.log(`${SIGNAL_SERVER_API_URL}room/${params.roomID}/newUser`);
                try {
                    const response = await fetch(`${SIGNAL_SERVER_API_URL}room/${params.roomID}/newUser`, {
                        method: 'GET',
                        mode: 'cors'
                    });
                    // console.log(response);
                    const jsonData = await response.json();
                    console.log(jsonData.userID);
                    setUserData({...userData, userID: jsonData.userID})
                } catch (error) {
                    console.log(error);
                }
            };
            getUserID();
        }
    }, [])


    // const userID = "test";
    // const userID = getUser();

    const { sigChannel, sendMessage } = useSignalChannel(
            userData.userID, params.roomID || "error", 
            setSigChannelState,
            sigChMsgQueue,
            setSigChMsgQueue);


    const { rtcp, createDataChannel, createAnswer, createOffer } = useRTCP(
            sigChannel, 
            sendMessage, 
            userData.userID, 
            params.roomID || "error", 
            sigChannelState, setRTCPState);

    // Handle Incoming Signaling Channel Messages
    useEffect(() => {
        const message = sigChMsgQueue.shift();
        if (!message || sigChannel.readyState !== sigChannel?.OPEN) { return };

        switch (message.type) {
            case msgTypes.incoming.s2cChannelEnter:
                console.log("Someone Has Entered the Channel");
                if (rtcp) {
                    const handleIncUser = async () => {
                        const rtcpOffer = await createOffer(rtcp);
                        sendMessage({
                            type: msgTypes.outgoing.c2sSDPOffer,
                            roomID: params.roomID,
                            srcUID: userData.userID,
                            offer: rtcpOffer
                        });
                    };
                    handleIncUser();
                } else {
                    console.log("Cannot create RTCP Offer - RTCP Connection Not Initializied");
                }
                break;
            case msgTypes.incoming.s2cChannelExit:
                console.log("Someone Has Left the Channel");
                break;
            case msgTypes.incoming.s2cSDPOffer:
                console.log("SDP Offer Received From Channel");
                if (rtcp) {
                    const handleIncOffer = async () => {
                        const rtcpAnswer = await createAnswer(rtcp);
                        sendMessage({
                            type: msgTypes.outgoing.c2sSDPOffer,
                            roomID: params.roomID,
                            srcUID: userData.userID,
                            answer: rtcpAnswer
                        });
                    }
                    handleIncOffer();
                } else {
                    console.log("Cannot create RTCP Offer - RTCP Connection Not Initializied");
                }
                break;
            case msgTypes.incoming.s2cSDPAnswer:
                console.log("SDP Answer Received From Channel");
                break;
            case msgTypes.incoming.s2cICECandidate:
                console.log("ICE Candidate Received From Channel");
                break;
            default:
                console.log("Non-Actionable Message Type Received");
        };
    }, [ sigChMsgQueue ])


    useEffect(() => {
        if (sigChannel.readyState === sigChannel?.OPEN) {
            sendMessage({
                type: msgTypes.outgoing.c2sChannelEnter,
                roomID: params.roomID,
                srcUID: userData.userID
            }) 
        } else {
            console.log(`Signaling Channel State: ${sigChannel?.readyState}`);
        };
    }, [ sigChannelState ]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be a room!</Typography>
            </Grid>
        </Grid>
    )
}

export default RoomSession;