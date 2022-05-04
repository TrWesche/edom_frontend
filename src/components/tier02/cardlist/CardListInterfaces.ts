import { NavigateFunction } from 'react-router-dom';
import { CardProps } from "../../tier03/cards/_interfaceCardProps";
import { ReturnEquipObject } from '../../../interfaces/edomEquipInterfaces';
import { ReturnGroupObject } from '../../../interfaces/edomGroupInterfaces';
import { ReturnRoomObject } from '../../../interfaces/edomRoomInterfaces';
import { ReturnUserObject } from '../../../interfaces/edomUserInterfaces';

export interface CardListRenderProps {
    xlRows?: number
    lgRows?: number
    mdRows?: number
    smRows?: number
    xsRows?: number
    xlColumns?: number
    lgColumns?: number
    mdColumns?: number
    smColumns?: number
    xsColumns?: number
};

export interface CardListProps {
    listid: string
    cardType: string
    navigate: NavigateFunction
    cardContent: Array<CardProps>
    renderConfig?: CardListRenderProps
    displayIsProcessing?: boolean
    displayError?: boolean
};


export interface EquipListProps {
    equip: Array<ReturnEquipObject>
    isProcessing: boolean
    error?: boolean
};

export interface GroupListProps {
    group: Array<ReturnGroupObject>
    isProcessing: boolean
    error?: boolean
};

export interface RoomListProps {
    rooms: Array<ReturnRoomObject>
    isProcessing: boolean
    error?: boolean
};

export interface UserListProps {
    users: Array<ReturnUserObject>
    isProcessing: boolean
    error?: boolean
};