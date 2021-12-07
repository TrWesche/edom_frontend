import {
    CardMedia,
    Card,
    Typography,
    Paper
} from "@mui/material"

import {createRef, Fragment, useEffect, useState} from "react";
import ButtonBar from "./ButtonBar";

export interface VideoPlayerProps {
    media: MediaStream | undefined,
    remote: boolean
}

const VideoPlayer = ( {media, remote}: VideoPlayerProps ) => {

    const [videoMuted, setVideoMuted] = useState<Boolean>(false);
    const [audioMuted, setAudioMuted] = useState<Boolean>(false);
    const [showVideoToggle, setShowVideoToggle] = useState<Boolean>(true);
    const [showAudioToggle, setShowAudioToggle] = useState<Boolean>(true);

    const videoElement =  createRef<HTMLVideoElement>();

    useEffect(() => {
        if (videoElement.current && media) {
            videoElement.current.srcObject = media;
        }
    }, [media, videoElement]);
    
    

    const render = () => {
        if (media) {
            return (
                <Paper>
                    <Card>
                        <CardMedia
                            component="video"
                            autoPlay
                            ref={videoElement}
                        />
                    </Card>
                    <ButtonBar />
                </Paper>
            )
        } else {
            return (
                <Card>
                    <Typography>Awaiting Local Media</Typography>
                </Card>
            )
        }
    }

    // const streamURL = URL.createObjectURL(media);

    return (
        <Fragment>
            {render()}
        </Fragment>
    )
}  

export default VideoPlayer;