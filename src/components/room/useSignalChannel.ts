// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0

import { useEffect, useRef } from "react";
// import ws from "ws";

import { SIGNAL_SERVER_WS_URL } from "../../config/config";
import * as roomEvents from "./roomEventDictionary.json"

// interface SendMessageProps {

// }


const useSignalChannel = (srcUID: string, roomID: string, dependencies: Array<string> = []) => {
    let msgContents;
    const sigChRef = useRef<WebSocket>();

    useEffect(() => {
        sigChRef.current = new WebSocket(SIGNAL_SERVER_WS_URL);

        sigChRef.current.addEventListener("open", () => {
            console.log("Signal Channel Opened");
        });

        sigChRef.current.addEventListener("close", (ev: CloseEvent) => {
            console.log("Signaling Channel Closed");
            console.log(ev.code);
            console.log(ev.reason);
        });

        sigChRef.current.addEventListener("error", (ev: Event) => {
            console.log("Signaling Channel Error");
        });


        sigChRef.current.addEventListener("message", (ev: MessageEvent) => {
            msgContents = JSON.parse(ev.data);
            console.log(msgContents);
    
            switch (msgContents.type) {
                case roomEvents.Signal.RecievedChannelEntered:
                    console.log("Someone Has Entered the Channel");
                    break;
                case roomEvents.Signal.RecievedChannelExited:
                    console.log("Someone Has Left the Channel");
                    break;
                case roomEvents.Signal.RecievedSDPOffer:
                    console.log("SDP Offer Received From Channel");
                    break;
                case roomEvents.Signal.RecievedSDPAnswer:
                    console.log("SDP Answer Received From Channel");
                    break;
                case roomEvents.Signal.ReceivedICECandidate:
                    console.log("ICE Candidate Received From Channel");
                    break;
                default:
                    console.log("Non-Actionable Message Type Received");
            }
            console.log(ev.data);
        });

        // sigChRef.current = new ws(SIGNAL_SERVER_WS_URL);
        
        // const temp = new WebSocket(SIGNAL_SERVER_WS_URL)
        // temp!.onopen((e) => {
        //     console.log("test")
        // })

        
        // sigChRef.current?.on("open", () => {
        //     console.log("Signaling Channel Opened");
        //     // TODO: Send channel entered message here?
        // });
    
        // sigChRef.current?.on("close", (code, reason) => {
        //     console.log("Signaling Channel Closed");
        //     console.log(code);
        //     console.log(reason);
        // });
    
        // sigChRef.current?.on("error", () => {
        //     console.log("Signaling Channel Error");
        // });
    
        // sigChRef.current?.on("message", (data: string) => {
        //     msgContents = JSON.parse(data);
        //     console.log(msgContents);
    
        //     switch (msgContents.type) {
        //         case roomEvents.Signal.RecievedChannelEntered:
        //             console.log("Someone Has Entered the Channel");
        //             break;
        //         case roomEvents.Signal.RecievedChannelExited:
        //             console.log("Someone Has Left the Channel");
        //             break;
        //         case roomEvents.Signal.RecievedSDPOffer:
        //             console.log("SDP Offer Received From Channel");
        //             break;
        //         case roomEvents.Signal.RecievedSDPAnswer:
        //             console.log("SDP Answer Received From Channel");
        //             break;
        //         case roomEvents.Signal.ReceivedICECandidate:
        //             console.log("ICE Candidate Received From Channel");
        //             break;
        //         default:
        //             console.log("Non-Actionable Message Type Received");
        //     }
        //     console.log(data);
        // });
    }, [ roomID, ...dependencies ]);
    // TODO: Better Define Dependencies to Avoid Spread Operator
    

    const sendMessage = (message: Object) => {
        sigChRef.current?.send(JSON.stringify(message));
    };

    return {sigChannel: sigChRef.current, msgContents, sendMessage};
};

export default useSignalChannel;