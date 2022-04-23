import {CardContentProps} from '../../tier04/cards/CardContentSection';

// Interface Imports
export interface CardSettingProps {
    displayEdit: boolean
    displayMedia: boolean
    mediaHeight: number
    displayContent: boolean
    contentHeight: number
    displayActions: boolean
    actionHeight: number
    enableActionArea: boolean
};

export interface CardDataProps {
    editAllowed: boolean
    editButtonDestination: string
    actionAreaDestination: string
    mediaURI: string
    mediaAltText: string
    contentTexts: Array<CardContentProps>
};

export interface CardProps {
    settings: CardSettingProps
    data: CardDataProps
};