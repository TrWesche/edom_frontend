// Library Imports
import React, { Fragment, MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
import {
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CardActions,
    Fab,
    Box
} from "@mui/material"

import CardEditFAB from '../../tier04/cards/cardEditFAB';
import CardMediaImage from '../../tier04/cards/CardMediaImage';
import CardContentSection, {CardContentProps} from '../../tier04/cards/CardContentSection';

// Interface Imports


interface CardSettingProps {
    numColumns: number
    numRows: number
    displayMedia: boolean
    displayContent: boolean
    displayActions: boolean
    displayEdit: boolean
};

interface CardBaseProps {
    settings: CardSettingProps
    navigate: NavigateFunction
};

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


const CardBase = (config: CardBaseProps) => {
    return (
        <Box>
            {config.settings.displayEdit && 
                <CardEditFAB 
                    editPermissions={true}
                    navigate={config.navigate}
                    navDestination={"/EditButtonDestination"}
                />
            }

            <Card sx={{ flexGrow: 1}} elevation={2}>
                {config.settings.displayActions ?
                    <CardActionArea onClick={(e) => handleClick(e, config.navigate, "/cardActionDestination")}>
                        <CardMediaImage 
                            showMedia={config.settings.displayMedia}
                            srcURI={"inDevelopment"}
                            altText={"inDevelopment"}
                        />
                        <CardContentSection 
                            showContent={config.settings.displayContent}
                            textSections={[{textVariant: "h5", textContent: "Testing"}]}
                        />
                    </CardActionArea>
                    :
                    <Fragment>
                        <CardMediaImage 
                            showMedia={config.settings.displayMedia}
                            srcURI={"inDevelopment"}
                            altText={"inDevelopment"}
                        />
                        <CardContentSection 
                            showContent={config.settings.displayContent}
                            textSections={[{textVariant: "h5", textContent: "Testing"}]}
                        />
                    </Fragment>
                }
            </Card>
        </Box>
    )
};

export default CardBase;