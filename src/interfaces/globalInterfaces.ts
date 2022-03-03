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

export interface GroupUserObjectProps extends UserObjectProps {
    group?: GroupObjectProps
    roles?: Array<GroupRoleProps>
};

export interface UserLoginProps {
    username?: string
    password?: string
};

export interface GroupObjectProps {
    id?: string
    public?: boolean
    name?: string
    image?: string
    headline?: string
    description?: string
};

export interface RoomObjectProps {
    id?: string
    public?: boolean
    name?: string
    category: string
    image?: string
    headline?: string
    description?: string
    group?: GroupObjectProps
    user?: UserObjectProps
};

export interface EquipObjectProps {
    id?: string
    public?: boolean
    name?: string
    configuration?: string
    category: string
    image?: string
    headline?: string
    group?: GroupObjectProps
    user?: UserObjectProps
};


export interface GroupRoleProps {
    id?: string
    name?: string
    permissions?: Array<GroupPermissionProps>
};


export interface GroupPermissionProps {
    id?: string
    name?: string
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