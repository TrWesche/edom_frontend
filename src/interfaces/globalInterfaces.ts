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

export interface AlertValueObjectProps {
    open: boolean
    content: string
    severity: AlertColor | undefined
};