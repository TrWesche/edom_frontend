import ws from "ws";
import { ClientRequestArgs } from "http";
import * as msgTypes from "./_wsMsgTypes.json";

export const eventDictionary = {
    SignalOpened: "SignalOpened",
    SignalClosed: "SignalClosed",
    SignalError: "SignalError",
    ChannelEntered: "ChannelEntered",
    ChannelExited: "ChannelExited",
    RecievedChannelEntered: "RecievedChannelEntered",
    RecievedChannelExited: "RecievedChannelExited",
    RecievedSDPOffer: "RecievedSDPOffer",
    RecievedSDPAnswer: "RecievedSDPAnswer",
    ReceivedICECandidate: "ReceivedICECandidate"
}

export interface wsSignalServerMsg {
    type: string,
    trgtUID?: string,
    roomID?: string,
    srcUID?: string,
    offer?: RTCSessionDescriptionInit,
    answer?: RTCSdpType,
    ice?: RTCIceCandidateType
};


export interface rtcpCallback {
    (rtcp: RTCPeerConnection): void
}

export default class wsSignalChannel extends EventTarget { 
    wsURL: string;
    wsOptions?: ws.ClientOptions | ClientRequestArgs;
    websocket: ws;
    msgContents: wsSignalServerMsg;

    // Event Definitiions
    private _SignalOpened: Event = new Event(eventDictionary.SignalOpened);
    private _SignalClosed: Event = new Event(eventDictionary.SignalClosed);
    private _SignalError: Event = new Event(eventDictionary.SignalError);
    private _ChannelEntered: Event = new Event(eventDictionary.ChannelEntered);
    // private _ChannelExited: Event = new Event(eventDictionary.ChannelExited);

    userID: undefined | string;
    roomID: undefined | string;
    private registered: boolean;

    constructor(wsURL: string, wsOptions?: ws.ClientOptions | ClientRequestArgs) {
        super();
        this.wsURL = wsURL;
        this.wsOptions = wsOptions;
        this.websocket = new ws(wsURL, wsOptions);
        this.msgContents = {
            type: msgTypes.configuration.wsSignalChannelInit
        }
        this.registered = false;
        this.addWSEvents();
    };

    private addWSEvents() {   
        this.websocket.addEventListener("open", this.wsOpened);
        this.websocket.addEventListener("close", this.wsClosed);
        this.websocket.addEventListener("error", this.wsError);
        this.websocket.addEventListener("message", this.wsMessage);
    };

    private wsOpened(ev: ws.Event) {
        console.log("Websocket Connection Established");
        console.log(ev);
        this.dispatchEvent(this._SignalOpened);
    };

    private wsClosed(ev: ws.CloseEvent) {
        console.log("Websocket Connection Closed");
        console.log(ev);
        this.dispatchEvent(this._SignalClosed);
    };

    private wsError(ev: ws.ErrorEvent) {
        console.log("Websocket Connection Error");
        console.log(ev);
        this.dispatchEvent(this._SignalError);
    };

    private wsMessage(event: ws.MessageEvent) {
        if (!this.registered) {
            console.log("Message received before channel registration, input ignored");
            return;
        }

        this.msgContents = JSON.parse(event.data.toString());
        switch (this.msgContents.type) {
            case msgTypes.configuration.wsSignalChannelInit:
                console.log("Signaling Channel Websocket Initializing");
                break;
            case msgTypes.incoming.s2cChannelEnter:
                this.receivedChannelEnter(this.msgContents);
                break;
            case msgTypes.incoming.s2cChannelExit:
                this.receivedChannelExit(this.msgContents);
                break;
            case msgTypes.incoming.s2cSDPOffer:
                this.receivedChannelOffer(this.msgContents);
                break;
            case msgTypes.incoming.s2cSDPAnswer:
                this.receivedChannelAnswer(this.msgContents);
                break;
            case msgTypes.incoming.s2cICECandidate:
                this.receivedICECandidate(this.msgContents);
                break;
            default:
                console.log("Signal Websocket Received a Non-Actionable Message Type");
        };
    };
    
    private receivedChannelEnter(message: wsSignalServerMsg) {
        console.log("Channel Entered Event Fired");
        console.log(message);
        
        this.dispatchEvent(
            new CustomEvent("RecievedChannelEntered", { detail: message })
        );
    };

    private receivedChannelExit(message: wsSignalServerMsg) {
        console.log("Channel Exit Event Fired");
        console.log(message);

        this.dispatchEvent(
            new CustomEvent("RecievedChannelExit", { detail: message })
        );
    };

    private receivedChannelOffer(message: wsSignalServerMsg) {
        console.log("Channel Offer Event Fired");

        this.dispatchEvent(
            new CustomEvent("RecievedSDPOffer", { detail: message })
        );
    };

    private receivedChannelAnswer(message: wsSignalServerMsg) {
        console.log("Channel Answer Event Fired");
        
        this.dispatchEvent(
            new CustomEvent("RecievedSDPAnswer", { detail: message })
        );
    };

    private receivedICECandidate(message: wsSignalServerMsg) {
        console.log("Channel ICE Candidate Event Fired");
        
        this.dispatchEvent(
            new CustomEvent("RecievedICECandidate", { detail: message })
        );
    };

    public sendMessage(message: wsSignalServerMsg) {
        JSON.stringify(message);
        this.websocket.send(message);
    };

    public registerSession(userID: string, roomID: string) {
        if (this.websocket.readyState !== 1) {
            console.log("Session Registration Failed: Signaling Channel Not Ready");
            return;
        }

        console.log("Registering Session in Signaling Channel");
        this.userID = userID;
        this.roomID = roomID;
        
        try {
            this.sendMessage({
                type: msgTypes.outgoing.c2sChannelEnter,
                roomID: this.roomID,
                srcUID: this.userID
            });
            this.registered = true;
            console.log("Registration Success");

            this.dispatchEvent(this._ChannelEntered)
        } catch (error) {
            console.log("Registration Failed");   
        }
    };
};
