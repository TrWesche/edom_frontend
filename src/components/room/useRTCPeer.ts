// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0

import { useEffect, useRef } from "react";
// import ws from "ws";

import { RTCP_ICE_CONFIG } from "../../config/config";
import * as roomEvents from "./roomEventDictionary.json"


const useRTCP = (
        sigChannel: WebSocket | undefined, 
        sendMessage: Function | undefined, 
        userID: string | undefined, 
        roomID: string,
        sigChannelState: string,
        setRTCPState: React.Dispatch<string>
    ) => {
    // let msgContents;

    const rtcpRef = useRef<RTCPeerConnection>( new RTCPeerConnection(RTCP_ICE_CONFIG) );

    useEffect(() => {
        if (sigChannel === undefined || !sigChannel.OPEN) {
            console.log("Signaling Channel Connection Not Available.");
        } 
        else if ( userID === undefined || roomID === undefined ) {
            console.log("Missing User or Room information.")
        }
        else {
            console.log("Setting Up RTCPeer Connection");
            setRTCPState("initializing");
            
            // rtcpRef.current = new RTCPeerConnection(RTCP_ICE_CONFIG);

            rtcpRef.current.onicecandidate = ((ev: RTCPeerConnectionIceEvent) => {onIceCandidate(ev)});
            rtcpRef.current.onicecandidateerror = ((ev: Event) => {onIceCandidateError(ev)});
            rtcpRef.current.onconnectionstatechange = ((ev: Event) => {onConnectionState(ev)});
            rtcpRef.current.ontrack = ((ev: RTCTrackEvent) => {onNewTrack(ev)});
            rtcpRef.current.ondatachannel = ((ev: RTCDataChannelEvent) => {onDataChannel(ev)});

            console.log(rtcpRef.current);
        }


        function onIceCandidate(event: RTCPeerConnectionIceEvent) {
            console.log("Local RTCPeer ICE Candidate Created Successfully");
            if (event.candidate) {
                console.log("Sending New ICE Candidate");
                // console.log(event.candidate);
                const payload = {
                    type: roomEvents.RTCP.RTCPICECandidate,
                    srcUID: userID,
                    roomID: roomID,
                    candidate: event.candidate
                }

                if (sendMessage) {
                    sendMessage(payload);
                } else {
                    console.log("RTCP Send Via Signal Channel Failed - Send Message Function Not Defined");
                }
            }
        };
    
        function onIceCandidateError(event: Event) {
            console.log("Ice Candidate Error");
            console.log(event);
        };
    
        function onConnectionState(event: Event) {
            console.log("RTCP Connection State Updated");

            if (rtcpRef.current?.connectionState === "new") {
                setRTCPState("new");
                const payload = {
                    type: roomEvents.Window.ChannelEntered,
                    roomId: roomID,
                    srcUID: userID
                };

                if (sendMessage) {
                    sendMessage(payload);
                } else {
                    console.log("RTCP Send Via Signal Channel Failed - Send Message Function Not Defined");
                }
            }


            if (rtcpRef.current?.connectionState === 'connected') {
                setRTCPState("connected");
                console.log("Connection Established");
            };
        };
    
        function onNewTrack(event: RTCTrackEvent) {
            console.log("New Remote Track");
            console.log(event);
            const remoteTrack = event.track;
            const remoteStream = new MediaStream();
            remoteStream.addTrack(remoteTrack);
        };
    
        function onDataChannel(event: RTCDataChannelEvent) {
            const incomingChannel = event.channel;
            incomingChannel.addEventListener("open", (event) => {
                console.log("Data Channel Opened");
                console.log(event);
            });
            incomingChannel.addEventListener("close", (event) => {
                console.log("Data Channel Closed");
                console.log(event);
            });
            incomingChannel.addEventListener("message", (event) => {
                console.log("Message Received");
                console.log(event.data);
            });
        };

    }, [ roomID, userID, sendMessage, sigChannel, sigChannelState, rtcpRef.current?.onconnectionstatechange, 
         rtcpRef.current?.onicecandidate, setRTCPState ]);
    // TODO: Better Define Dependencies to Avoid Spread Operator
    

    // TODO: Finish Create Data Channel Logic & Logic to Send/Receive Data over Data Channel
    const createDataChannel = (rtcp: RTCPeerConnection, channelID: string) => {
        console.log(`Creating Data Channel: ${channelID}`);
        rtcp.createDataChannel(channelID);
    };

    const createOffer = async (rtcp: RTCPeerConnection) => {
        return (await rtcp.createOffer());
    };

    const createAnswer = async (rtcp: RTCPeerConnection) => {
        return (await rtcp.createAnswer());
    };

    return {rtcp: rtcpRef.current, createDataChannel, createOffer, createAnswer};
};

export default useRTCP;