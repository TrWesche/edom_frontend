import wsSignalChannel, { wsSignalServerMsg, eventDictionary } from "./wsSignalChannel";
import * as msgTypes from "./_wsMsgTypes.json";
import { SIGNAL_SERVER_WS_URL } from "../src/config/config";


const rtcp = new RTCPeerConnection();
const signalChannel = new wsSignalChannel(SIGNAL_SERVER_WS_URL);
const roomID = "placeholder";
const userID = "placeholder"


export const channelEntryHandler = (e: CustomEvent<wsSignalServerMsg>) => {
    console.log("Channel Entry Handler Called -- Sending Offer to Channel");
    rtcp.createOffer()
        .then(offer => {
            rtcp.setLocalDescription(offer);
            const payload = {
                type: msgTypes.outgoing.c2sSDPOffer,
                trgtUID: e.detail.srcUID,
                roomId: roomID,
                srcUID: userID,
                offer: offer
            }
            signalChannel.sendMessage(payload);
        });
}

// export const channelEntryHandler = (msg: wsSignalServerMsg, signalChannel: wsSignalChannel, rtcp: RTCPeerConnection) => {
//     console.log("Default Entry Callback -- Sending Offer")
//     rtcp.createOffer()
//         .then(offer => {
//             rtcp.setLocalDescription(offer);
//             const payload = {
//                 type: msgTypes.outgoing.c2sSDPOffer,
//                 trgtUID: msg.srcUID,
//                 roomId: signalChannel.roomID,
//                 srcUID: signalChannel.userID,
//                 offer: offer
//             }
//             signalChannel.sendMessage(payload);
//         });
// };


// public exitCallback(message: wsSignalServerMsg) {
//     console.log("Default Channel Entry Function Called - Overwrite to perform your target function.");
//     console.log("Data Recieved:");
//     console.log(message);
// };


// public answerCallback(message: wsSignalServerMsg) {
//     console.log("Default Answer Function Called - Overwrite to perform your target function.");
//     console.log("Data Recieved:");
//     console.log(message);
// };

// public offerCallback(message: wsSignalServerMsg) {
//     console.log("Default Offer Function Called - Overwrite to perform your target function.");
//     console.log("Data Recieved:");
//     console.log(message);
// };


// public iceCandidateCallback(message: wsSignalServerMsg) {
//     console.log("Default ICE Candidate Function Called - Overwrite to perform your target function.");
//     console.log("Data Recieved:");
//     console.log(message);
// };

// export default channelEntryHandler;