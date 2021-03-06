export interface RequestUserObject {
    username?: string
    password?: string
    email?: string
    public_email?: boolean
    first_name?: string
    public_first_name?: boolean
    last_name?: string
    public_last_name?: boolean
    location?: string
    public_location?: boolean
    headline?: string
    about?: string
    image_url?: string
    image_alt_text?: string
    public_profile?: boolean
    member_from?: string
};

export interface ReturnUserObject {
    id?: string
    username?: string
    username_clean?: string
    email?: string
    email_clean?: string
    public_email?: boolean
    first_name?: string
    public_first_name?: boolean
    last_name?: string
    public_last_name?: boolean
    location?: string
    public_location?: boolean
    headline?: string
    about?: string
    image_url?: string
    image_alt_text?: string
    public_profile?: boolean
    member_from?: string
    edit_permissions?: boolean
};

export interface RequestUserRequest {
    context: string
    action: string
    groupID?: string
};

export interface ReturnUserRequest {
    resolution: string
    groupID?: string
};

export interface RequestUserLogin {
    username?: string
    password?: string
};

export interface RequestPasswordChange {
    [key: string]: any
    password_e1: string
    password_e2: string
};