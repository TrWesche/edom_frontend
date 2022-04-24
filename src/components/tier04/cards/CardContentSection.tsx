// Library Imports
import { Fragment } from 'react';
import {
    CardContent,
    Typography,
    TypographyVariant
} from "@mui/material"

export interface CardContentProps {
    textVariant: TypographyVariant
    textContent: string
};

const CardContentSection = (props: {showContent: boolean, contentHeight?: number, textSections: Array<CardContentProps>}) => {
    return (
        <Fragment>
            {props.showContent && 
                <CardContent
                    sx={{
                        height: props.contentHeight ? `${props.contentHeight}px` : "auto",
                        textOverflow: 'ellipsis'
                    }}
                >
                    {
                        props.textSections.map((section) => {
                            if (section.textVariant === "body1" || section.textVariant === "body2") {
                                return (
                                    <Typography variant={section.textVariant} color="text.secondary">
                                        {section.textContent}
                                    </Typography>
                                )
                            } else {
                                return (
                                    <Typography gutterBottom variant={section.textVariant} component="div">
                                        {section.textContent}
                                    </Typography>
                                )
                            }
                        })
                    }
                </CardContent>
            }
        </Fragment>
    )
};

export default CardContentSection;