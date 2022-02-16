import { AlertColor } from '@mui/material'

export interface UserObjectProps {
    id?: string
    username?: string
};

export interface UserObjectPropsPrivate extends UserObjectProps {
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
    headline?: string
};

export interface RoomObjectProps {
    id?: string
    name?: string
    category: string
    image?: string
    headline?: string
    group?: GroupObjectProps
    user?: UserObjectProps
};


export interface EquipObjectProps {
    id?: string
    name?: string
    configuration?: string
    category: string
    image?: string
    headline?: string
    group?: GroupObjectProps
    user?: UserObjectProps
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