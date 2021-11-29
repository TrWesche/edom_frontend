// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0

import { useEffect, useRef } from "react";
// import ws from "ws";

import { RTCP_ICE_CONFIG } from "../../config/config";
import * as roomEvents from "./roomEventDictionary.json"


const useRTCP = (sigChannel: WebSocket | undefined, sendMessage: Function | undefined, userID: string, roomID: string) => {
    // let msgContents;

    const rtcpRef = useRef<RTCPeerConnection>();

    useEffect(() => {
        if (sigChannel === undefined || !sigChannel.OPEN) {
            console.log("Signaling Channel Connection Not Available.");
        } else {
            console.log("Setting Up RTCPeer Connection");
            rtcpRef.current = new RTCPeerConnection(RTCP_ICE_CONFIG);

            rtcpRef.current?.addEventListener("icecandidate", onIceCandidate);
            rtcpRef.current?.addEventListener("icecandidateerror", onIceCandidateError);
            rtcpRef.current?.addEventListener("connectionstatechange", onConnectionState);
            rtcpRef.current?.addEventListener("track", onNewTrack);
            rtcpRef.current?.addEventListener("datachannel", onDataChannel);

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
                
                // sigChannel?.send(JSON.stringify({
                //     type: roomEvents.RTCP.RTCPICECandidate,
                //     srcUID: userID,
                //     roomID: roomID,
                //     candidate: event.candidate
                // }))
            }
        };
    
        function onIceCandidateError(event: Event) {
            console.log("Ice Candidate Error");
            console.log(event);
        };
    
        function onConnectionState(event: Event) {
            if (rtcpRef.current?.connectionState === 'connected') {
                console.log("Connection Established");
            };
        };
    
        function onNewTrack(event: RTCTrackEvent) {
            console.log("New Remote Track");
            console.log(event);
            const remoteTrack = event.track;
            const remoteStream = new MediaStream();
            remoteStream.addTrack(remoteTrack);
        
            // const remoteVideo = document.getElementById('remoteVideo');
            // remoteVideo.srcObject = remoteStream;
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

    }, [sigChannel, roomID, userID, sendMessage, rtcpRef.current?.connectionState]);
    // TODO: Better Define Dependencies to Avoid Spread Operator
    

    // TODO: Finish Create Data Channel Logic & Logic to Send/Receive Data over Data Channel
    const createDataChannel = (channelID: string) => {
        console.log(`Creating Data Channel: ${channelID}`)
    };


    return {rtcp: rtcpRef.current, createDataChannel};
};

export default useRTCP;