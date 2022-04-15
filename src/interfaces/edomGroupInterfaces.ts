// Group Interfaces
export interface RequestGroupObject {
    name?: string
    headline?: string
    description?: string
    image_url?: string
    location?: string
    public_group?: boolean
};

export interface ReturnGroupObject {
    id?: string
    name?: string
    headline?: string
    description?: string
    image_url?: string
    location?: string
    public_group?: boolean
    edit_permissions?: boolean
};


// Request Interfaces
export interface RequestGroupRequest {
    context: string
    action: string
    users?: Array<string>
};

export interface ReturnGroupRequest {
    resolution: string
    users?: Array<string>
};


// User Management Interfaces
export interface RequestUserManagement {
    context: string
    action: string
    users?: Array<string>
    roles?: Array<string>
};

export interface ReturnUserManagement {
    resolution: string
    users?: Array<string>
    roles?: Array<string>
};


// Group Role Interfaces
export interface RequestGroupRole {
    context: string
    action: string
    role: string
};

export interface ReturnGroupRole {
    resolution: string
    role: string
};


// Group Role Permission Interfaces
export interface RequestGroupRolePermission {
    context: string
    action: string
    role: string
    permissions?: Array<string>
};

// Group Role Permission Interfaces
export interface ReturnGroupRolePermission {
    resolution: string
    role: string
    permissions?: Array<string>
};