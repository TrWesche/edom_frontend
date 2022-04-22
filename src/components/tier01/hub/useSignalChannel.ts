// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0

import React, { useEffect, useRef } from "react";
// import ws from "ws";

import { SIGNAL_SERVER_WS_URL } from "../../../config/config";
import { SigChMessageProps } from "./RoomSession";

const useSignalChannel = (
        srcUID: string | undefined,
        roomID: string | undefined, 
        setSigChannelState: React.Dispatch<string>,
        sigChMsgQueue: Array<SigChMessageProps>,
        setSigChMsgQueue: React.Dispatch<Array<SigChMessageProps>>
    ) => {

    const sigChRef = useRef<WebSocket>(new WebSocket(SIGNAL_SERVER_WS_URL));

    useEffect(() => {
        // sigChRef.current = new WebSocket(SIGNAL_SERVER_WS_URL);

        sigChRef.current.onopen = ((ev: Event) => {
            setSigChannelState("open");
        });

        sigChRef.current.onclose = ((ev: CloseEvent) => {
            console.log(`Signaling Channel Closed.  Code: ${ev.code}`);
            console.log(ev.reason);
            setSigChannelState("close");
        })

        sigChRef.current.onerror = ((ev: Event) => {
            console.log("Signaling Channel Error");
            setSigChannelState("error");
        });


        sigChRef.current.onmessage = ((ev: MessageEvent) => {
            try {
                const message = JSON.parse(ev.data);
                setSigChMsgQueue([...sigChMsgQueue, message]);
            } catch (error) {
                console.log("Could not parse event, invalid JSON")
            }
        });
    }, [ srcUID, roomID, setSigChannelState, setSigChMsgQueue, sigChMsgQueue ]);
    

    const sendMessage = (message: Object) => {
        console.log("Sending Message");
        console.log(message);

        sigChRef.current?.send(JSON.stringify(message));
    };

    return {sigChannel: sigChRef.current, sendMessage};
};

export default useSignalChannel;