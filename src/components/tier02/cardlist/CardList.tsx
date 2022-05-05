// Library Imports
import { Fragment, useLayoutEffect, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

// Material UI
import {
    Grid,
    Skeleton,
    Typography,
    useTheme
} from "@mui/material";

// Component Imports
import HorizontalCard from '../../tier03/cards/HorizontalCard';
import StackedCard from '../../tier03/cards/StackedCard';

// Interface Imports
import { CardListProps, CardListRenderProps } from './CardListInterfaces';
import { CardProps } from "../../tier03/cards/_interfaceCardProps";

const CardList = (config: CardListProps) => {
    // console.log(config);
    const stateLoading = () => {
        return (
            <Grid item xs={12} key={`${config.listid}-loading`}>
                <Skeleton>
                    <Typography>
                        Loading...
                    </Typography>
                </Skeleton>
            </Grid>   
        );
    };

    const stateError = () => {
        return (
            <Fragment>
                <Typography>
                    Uh oh... Something went wrong.
                </Typography>
            </Fragment>
        );
    };

    const stateLoaded = () => {
        return RenderCards(config.listid, config.navigate, config.cardType, config.renderConfig, config.cardContent);
    }

    
    if (config.displayIsProcessing === false || config.displayError === false) {
        return (
            <Grid container item spacing={4} minHeight={310} className={"CardListParent"}>
                {stateLoaded()}
            </Grid>
        )
    } else if (config.displayError) {
        return (
            <Grid container item spacing={4} minHeight={310} className={"CardListParent"}>
                {stateError()}
            </Grid>
        );
    } else {
        return (
            <Grid container item spacing={4} minHeight={310} className={"CardListParent"}>
                {stateLoading()}
            </Grid>
        )
    };
};

export default CardList;


const RenderCards = (
    listid: string,
    navigate: NavigateFunction,
    cardType: string,
    renderConfig: CardListRenderProps | undefined,
    cardData: Array<CardProps>
) => {
    const [renderFormat, setRenderFormat] = useState({
        rows: 1,
        colWidth: 6
    });
    const theme = useTheme();
    // console.log("Rendering Cards");
    // console.log(renderFormat);
    // console.log(theme.breakpoints.values);
    // console.log(window.innerWidth);

    // if (document.getElementsByClassName("CardListParent")[0]) {
    //     console.log(document.getElementsByClassName("CardListParent")[0].clientWidth)
    // }
    

    useLayoutEffect(() => {
        function updateSize() {
            // const screenWidth = document.getElementsByTagName('html')[0].clientWidth; // subtract scroll bar width
            const screenWidth = document.getElementsByClassName('CardListParent')[0] ? 
                document.getElementsByClassName('CardListParent')[0].clientWidth : 0; // subtract scroll bar width
            // console.log(document.getElementsByClassName("CardListParent"))

            if (screenWidth >= theme.breakpoints.values.xl) {
                setRenderFormat({
                    rows: renderConfig?.xlRows ? renderConfig.xlRows : 1,
                    colWidth: renderConfig?.xlColumns ? Math.max(1, Math.trunc(12 / renderConfig.xlColumns)) : 2
                });
            } else if (screenWidth >= theme.breakpoints.values.lg && renderConfig?.lgRows) {
                setRenderFormat({
                    rows: renderConfig?.lgRows ? renderConfig.lgRows : 1,
                    colWidth: renderConfig?.lgColumns ? Math.max(1, Math.trunc(12 / renderConfig.lgColumns)) : 3
                });
            } else if (screenWidth >= theme.breakpoints.values.md && renderConfig?.mdRows) {
                setRenderFormat({
                    rows: renderConfig?.mdRows ? renderConfig.mdRows : 1,
                    colWidth: renderConfig?.mdColumns ? Math.max(1, Math.trunc(12 / renderConfig.mdColumns)) : 4
                });
            } else if (screenWidth >= theme.breakpoints.values.sm && renderConfig?.smRows) {
                setRenderFormat({
                    rows: renderConfig?.smRows ? renderConfig.smRows : 2,
                    colWidth: renderConfig?.smColumns ? Math.max(1, Math.trunc(12 / renderConfig.smColumns)) : 6
                });
            } else {
                setRenderFormat({
                    rows: renderConfig?.xsRows ? renderConfig.xsRows : 4,
                    colWidth: renderConfig?.xsColumns ? Math.max(1, Math.trunc(12 / renderConfig.xsColumns)) : 12
                });
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [renderConfig, theme.breakpoints.values]);


    const cardsToRender: Array<CardProps> = cardData.slice(0, (renderFormat.rows * Math.trunc(12/renderFormat.colWidth)) - 1);
    const showDisplayMoreButton: boolean = (renderFormat.rows * Math.trunc(12/renderFormat.colWidth)) < cardData.length;

    // console.log(cardsToRender);
    // console.log(showDisplayMoreButton);

    switch (cardType) {
        case "horizontal":
            return (
                <Fragment>
                    {cardsToRender.map((card, idx) => {
                        return (
                            <Grid item xs={renderFormat.colWidth} key={`${listid}-card-${idx}`}>
                                {HorizontalCard(card, navigate)}
                            </Grid>    
                        )
                    })}
                    {showDisplayMoreButton && displayMore(listid)}
                </Fragment>
            );
        case "stacked":
            // console.log("Rendering Stacked");
            return (
                <Fragment>
                    {cardsToRender.map((card, idx) => {
                        return (
                            <Grid item xs={renderFormat.colWidth} key={`${listid}-card-${idx}`}>
                                {StackedCard(card, navigate)}
                            </Grid>    
                        )
                    })}
                    {showDisplayMoreButton && displayMore(listid)}
                </Fragment>
            )
        default:
            return (
                <Fragment>
                    {cardsToRender.map((card, idx) => {
                        return (
                            <Grid item xs={renderFormat.colWidth} key={`${listid}-card-${idx}`}>
                                {HorizontalCard(card, navigate)}
                            </Grid>    
                        )
                    })}
                    {showDisplayMoreButton && displayMore(listid)}
                </Fragment>
            )

    }
    
};


const displayMore = (listid: string,) => {
    return (
        <Grid item xs={12} key={`${listid}-view-more`}>
            <p>View More</p>
        </Grid>
    )
};