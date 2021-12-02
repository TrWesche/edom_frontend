// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0

import { useEffect, useRef, useState } from "react";
// import ws from "ws";

import { RTCP_ICE_CONFIG } from "../../config/config";
// import * as roomEvents from "./roomEventDictionary.json"


const useRTCP = (
        sigChannel: WebSocket | undefined, 
        // sendMessage: Function | undefined, 
        userID: string | undefined, 
        roomID: string | undefined,
        // sigChannelState: string,
        // setRTCPState: React.Dispatch<string>
    ) => {
    // let msgContents;
    const [iceCandidate, setIceCandidate] = useState<RTCIceCandidate>();
    const [connectionState, setConnectionState] = useState<RTCPeerConnectionState>();
    

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
            // setRTCPState("initializing");
            
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
                setIceCandidate(event.candidate);
                console.log("Local ICE Candidate Saved");
                // console.log("Sending New ICE Candidate");
                // const payload = {
                //     type: roomEvents.RTCP.RTCPICECandidate,
                //     srcUID: userID,
                //     roomID: roomID,
                //     candidate: event.candidate
                // }

                // if (sendMessage) {
                //     sendMessage(payload);
                // } else {
                //     console.log("RTCP Send Via Signal Channel Failed - Send Message Function Not Defined");
                // }
            }
        };
    
        function onIceCandidateError(event: Event) {
            console.log("Ice Candidate Error");
            console.log(event);
        };
    
        function onConnectionState(event: Event) {
            console.log("RTCP Connection State Updated");
            setConnectionState(rtcpRef.current?.connectionState);

            // if (rtcpRef.current?.connectionState === "new") {
            //     setRTCPState("new");
            //     const payload = {
            //         type: roomEvents.Window.ChannelEntered,
            //         roomId: roomID,
            //         srcUID: userID
            //     };

            //     if (sendMessage) {
            //         sendMessage(payload);
            //     } else {
            //         console.log("RTCP Send Via Signal Channel Failed - Send Message Function Not Defined");
            //     }
            // }


            // if (rtcpRef.current?.connectionState === 'connected') {
            //     setRTCPState("connected");
            //     console.log("Connection Established");
            // };
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

    }, [ roomID, userID, sigChannel, rtcpRef ]);
    

    // TODO: Finish Create Data Channel Logic & Logic to Send/Receive Data over Data Channel
    const createDataChannel = (channelID: string) => {
        console.log(`Creating Data Channel: ${channelID}`);
        rtcpRef.current.createDataChannel(channelID);
    };

    const createOffer = async () => {
        return (await rtcpRef.current.createOffer());
    };

    const createAnswer = async () => {
        return (await rtcpRef.current.createAnswer());
    };

    const addTracks = (mediaStream: MediaStream) => {
        if (rtcpRef.current.getSenders().length !== 0) {
            mediaStream.getTracks().forEach(incomingTrack => {
                const matchFound = rtcpRef.current.getSenders().reduce((acc, sender) => {
                    return (acc && (sender.track?.id === incomingTrack.id))
                }, false);

                if (!matchFound) {
                    rtcpRef.current.addTrack(incomingTrack, mediaStream);
                }
            })
        }
    };

    const removeTracks = (mediaStream: MediaStream) => {
        if (rtcpRef.current.getSenders().length !== 0) {
            rtcpRef.current.getSenders().forEach( sender => {
                const matchFound = mediaStream.getTracks().reduce((acc, trk) => {
                    return (acc && (trk.id === sender.track?.id));
                }, false)

                if (!matchFound) {
                    rtcpRef.current.removeTrack(sender);
                }
            })
        }
    };

    return {
        rtcp: rtcpRef.current, 
        iceCandidate,
        connectionState,
        createDataChannel, 
        createOffer, 
        createAnswer, 
        addTracks, 
        removeTracks
    };
};

export default useRTCP;