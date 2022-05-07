// Library Imports
import { Fragment, MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    Box
} from "@mui/material"

import CardMediaImage from '../../tier04/cards/CardMediaImage';
import CardContentSection from '../../tier04/cards/CardContentSection';
import CardEditFAB from '../../tier04/cards/CardEditFAB';
import { CardProps } from "./_interfaceCardProps";


interface ClickEvent extends MouseEvent<HTMLButtonElement> {
    target: ClickTarget
};

interface ClickTarget extends EventTarget {
    href?: string
};

const handleClick = (e: ClickEvent, navigate: NavigateFunction, target: string) => {
    e.preventDefault();
    if (target !== "") {
        navigate(target);
    } else {
        console.log("Error, destination not defined")
    }
};


const StackedCard = (config: CardProps, navigate: NavigateFunction, parentKey: string) => {
    return (
        <Box>
            {config.settings.displayEdit && 
                <CardEditFAB 
                    editPermissions={config.data.editAllowed}
                    navigate={navigate}
                    navDestination={config.data.editButtonDestination}
                />
            }

            <Card sx={{ display:"flex", flexDirection:"row", flexGrow: 1}} elevation={2}>
                
                {config.settings.enableActionArea ?
                    <CardActionArea 
                        sx={{display: 'flex', justifyContent: 'flex-start'}}
                        onClick={(e) => handleClick(e, navigate, config.data.actionAreaDestination)}>
                        <CardMediaImage 
                            showMedia={config.settings.displayMedia}
                            mediaHeight={config.settings.mediaHeight}
                            mediaWidth={config.settings.mediaWidth}
                            srcURI={config.data.mediaURI}
                            altText={config.data.mediaAltText}
                        />
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            flexGrow: 1, 
                            maxHeight: config.settings.mediaHeight ? config.settings.mediaHeight : 'none',
                        }}>
                            <CardContentSection 
                                showContent={config.settings.displayContent}
                                contentHeight={config.settings.contentHeight}
                                textSections={config.data.contentTexts}
                                keyPrefix={parentKey}
                            />
                        </Box>
                    </CardActionArea>
                    :
                    <Fragment>                
                        <CardMediaImage 
                            showMedia={config.settings.displayMedia}
                            mediaHeight={config.settings.mediaHeight}
                            mediaWidth={config.settings.mediaWidth}
                            srcURI={config.data.mediaURI}
                            altText={config.data.mediaAltText}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContentSection 
                                showContent={config.settings.displayContent}
                                contentHeight={config.settings.contentHeight}
                                textSections={config.data.contentTexts}
                                keyPrefix={parentKey}
                            />
                        </Box>
                    </Fragment>
                }
            </Card>
        </Box>
    )
};

export default StackedCard;