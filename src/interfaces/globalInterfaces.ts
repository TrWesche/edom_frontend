import { AlertColor } from '@mui/material'

export interface AlertValueObjectProps {
    open: boolean
    content: string
    severity: AlertColor | undefined
};

export interface QueryStringFilterProps {
    key: string
    value: string
};