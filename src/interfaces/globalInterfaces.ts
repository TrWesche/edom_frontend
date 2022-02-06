import { AlertColor } from '@mui/material'

export interface UserObjectProps {
    id?: string
    username?: string
    email?: string
    password?: string
    first_name?: string
    last_name?: string
};

export interface UserLoginProps {
    username?: string
    password?: string
};



export interface GroupObjectProps {
    id?: string
    name?: string
    image?: string
};

export interface RoomObjectProps {
    id?: string
    name?: string
    category: string
    image?: string
};



export interface AlertValueObjectProps {
    open: boolean
    content: string
    severity: AlertColor | undefined
};

export interface QueryStringFilterProps {
    key: string
    value: string
};