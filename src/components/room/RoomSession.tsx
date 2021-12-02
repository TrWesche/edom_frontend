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

    const [rtcpEventQueue, setRTCPEventQueue] = useState(); // TODO: Backup incoming channel events
    const [sigChMsgQueue, setSigChMsgQueue] = useState<Array<SigChMessageProps>>([]);

    // Get UserID on Room Entry -- Will need to be modified for Context later
    useEffect(() => {
        if (userData.userID === undefined) {
            const getUserID = async ()  => {
                try {
                    const response = await fetch(`${SIGNAL_SERVER_API_URL}room/${params.roomID}/newUser`, {
                        method: 'GET',
                        mode: 'cors'
                    });
                    const jsonData = await response.json();
                    setUserData({...userData, userID: jsonData.userID})
                } catch (error) {
                    console.log(error);
                }
            };
            getUserID();
        }
    }, [])


    const { sigChannel, sendMessage } = useSignalChannel(
            userData.userID, params.roomID || "error", 
            setSigChannelState,
            sigChMsgQueue,
            setSigChMsgQueue);

    const { rtcp, 
            iceCandidate, 
            connectionState, 
            createDataChannel, 
            createOffer, 
            createAnswer, 
            addTracks, 
            removeTracks } = useRTCP(sigChannel, userData.userID, params.roomID);


    // Handle Incoming Signaling Channel Messages
    useEffect(() => {
        const message = sigChMsgQueue.shift();
        if (!message || sigChannel.readyState !== sigChannel?.OPEN) { return };
        

        switch (message.type) {
            case msgTypes.incoming.s2cChannelEnter:
                console.log("Someone Has Entered the Channel");
                if (rtcp && userData.userID) {
                    const handleIncUser = async () => {
                        const rtcpOffer = await createOffer();
                        sendMessage({
                            type: msgTypes.outgoing.c2sSDPOffer,
                            roomID: params.roomID,
                            srcUID: userData.userID,
                            trgtUID: message.srcUID,
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
                if (rtcp && userData.userID) {
                    const handleIncOffer = async () => {
                        const rtcpAnswer = await createAnswer();
                        sendMessage({
                            type: msgTypes.outgoing.c2sSDPAnswer,
                            roomID: params.roomID,
                            srcUID: userData.userID,
                            trgtUID: message.srcUID,
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
        if (sigChannelState === "open" && userData.userID) {
            sendMessage({
                type: msgTypes.outgoing.c2sChannelEnter,
                roomID: params.roomID,
                srcUID: userData.userID
            }) 
        } else {
            console.log(`Signaling Channel State: ${sigChannelState}`);
        };
    }, [ sigChannelState, params.roomID, userData.userID ]);
    // TODO: SendMessage probably needs to go into a Callback to address this react error propertly

    useEffect(() => {
        if (sigChannelState === "open" && userData.userID && iceCandidate) {
            console.log("Sending New ICE Candidate");
            const payload = {
                type: msgTypes.outgoing.c2sICECandidate,
                srcUID: userData.userID,
                roomID: params.roomID,
                candidate: iceCandidate
            };
    
            sendMessage(payload);
        } else {
            console.log("ICECandidate - Awaiting Signaling Channel")
        }
        
    }, [ iceCandidate, sigChannelState, params.roomID, userData.userID ])
    // TODO: SendMessage probably needs to go into a Callback to address this react error propertly

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>This will be a room!</Typography>
            </Grid>
        </Grid>
    )
}

export default RoomSession;