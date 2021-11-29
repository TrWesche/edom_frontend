import ws from "ws";
import { ClientRequestArgs } from "http";
import * as msgTypes from "./_wsMsgTypes.json";


export interface wsSignalServerMsg {
    type: string,
    trgtUID?: string,
    roomID: string,
    srcUID: string,
    offer?: RTCSdpType,
    answer?: RTCSdpType,
    ice?: RTCIceCandidateType
};


export default class wsSignalServer { 
    wsURL: string;
    wsOptions?: ws.ClientOptions | ClientRequestArgs;
    websocket: ws;

    constructor(wsURL: string, wsOptions?: ws.ClientOptions | ClientRequestArgs) {
        this.wsURL = wsURL;
        this.wsOptions = wsOptions;
        this.websocket = new ws(wsURL, wsOptions);
        this.addEvents();
    };

    private addEvents() {   
        this.websocket.addEventListener("open", this.wsOpened);
        this.websocket.addEventListener("close", this.wsClosed);
        this.websocket.addEventListener("error", this.wsError);
        this.websocket.addEventListener("message", this.wsMessage);
    };


    private wsOpened(ev: ws.Event) {
        console.log("Websocket Connection Established");
        this.openedCallback(ev);
    };

    public openedCallback(ev: ws.Event) {
        console.log("Default Websocket Opened Function Called - Overwrite to perform your target function.");
        console.log("Open Event Details:");
        console.log(ev);
    };


    private wsClosed(ev: ws.CloseEvent) {
        console.log("Websocket Connection Closed");
        this.closedCallback(ev);
    };

    public closedCallback(ev: ws.CloseEvent) {
        console.log("Default Websocket Closed Function Called - Overwrite to perform your target function.");
        console.log("Close Event Details:");
        console.log(ev);
    };


    private wsError(ev: ws.ErrorEvent) {
        console.log("Websocket Connection Error");
        this.errorCallback(ev);
    };

    public errorCallback(ev: ws.ErrorEvent) {
        console.log("Default Websocket Error Function Called - Overwrite to perform your target function.");
        console.log("Error Event Details:");
        console.log(ev);
    };



    private wsMessage(event: ws.MessageEvent) {
        const msgContents = JSON.parse(event.data.toString());
        switch (msgContents.type) {
            case msgTypes.incoming.s2cChannelEnter:
                this.receivedChannelEnter(msgContents);
                break;
            case msgTypes.incoming.s2cChannelExit:
                this.receivedChannelExit(msgContents);
                break;
            case msgTypes.incoming.s2cSDPOffer:
                this.receivedChannelOffer(msgContents);
                break;
            case msgTypes.incoming.s2cSDPAnswer:
                this.receivedChannelAnswer(msgContents);
                break;
            case msgTypes.incoming.s2cICECandidate:
                this.receivedICECandidate(msgContents);
                break;
            default:
                console.log("Signal Websocket Received a Non-Actionable Message Type");
        };
    };
    

    private receivedChannelEnter(message: wsSignalServerMsg) {
        console.log("Channel Entered Event Fired");
        this.entryCallback(message);
    };

    public entryCallback(message: wsSignalServerMsg) {
        console.log("Default Channel Entry Function Called - Overwrite to perform your target function.");
        console.log("Data Recieved:");
        console.log(message);
    };



    private receivedChannelExit(message: wsSignalServerMsg) {
        console.log("Channel Exit Event Fired");
        this.exitCallback(message);
    };

    public exitCallback(message: wsSignalServerMsg) {
        console.log("Default Channel Entry Function Called - Overwrite to perform your target function.");
        console.log("Data Recieved:");
        console.log(message);
    };



    private receivedChannelOffer(message: wsSignalServerMsg) {
        console.log("Channel Offer Event Fired");
        this.offerCallback(message);
    };

    public offerCallback(message: wsSignalServerMsg) {
        console.log("Default Offer Function Called - Overwrite to perform your target function.");
        console.log("Data Recieved:");
        console.log(message);
    };



    private receivedChannelAnswer(message: wsSignalServerMsg) {
        console.log("Channel Answer Event Fired");
        this.answerCallback(message);
    };

    public answerCallback(message: wsSignalServerMsg) {
        console.log("Default Answer Function Called - Overwrite to perform your target function.");
        console.log("Data Recieved:");
        console.log(message);
    };



    private receivedICECandidate(message: wsSignalServerMsg) {
        console.log("Channel ICE Candidate Event Fired");
        this.iceCandidateCallback(message);
    };

    public iceCandidateCallback(message: wsSignalServerMsg) {
        console.log("Default ICE Candidate Function Called - Overwrite to perform your target function.");
        console.log("Data Recieved:");
        console.log(message);
    };


    public sendMessage(message: wsSignalServerMsg) {
        JSON.stringify(message);
        this.websocket.send(message);
    };
};