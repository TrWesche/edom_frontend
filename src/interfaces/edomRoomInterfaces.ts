export interface RequestRoomObject {
    id: string
    context: string
    ownerid?: string
    name?: string
    category: string
    image_url?: string
    headline?: string
    description?: string
    public_room?: boolean
};

export interface ReturnRoomObject {
    id?: string
    resolution?: string
    name?: string
    category: string
    image_url?: string
    headline?: string
    description?: string
    public_room?: boolean
    owner_user?: OwnerUser
    owner_group?: OwnerGroup
};

interface OwnerUser {
    username: string
    username_lowercase: string
};

interface OwnerGroup {
    group_id: string
    group_name: string
};


export interface RequestRoomEquip {
    context?: string,
    action: string,
    ownerID?: string,
    equipIDs: Array<string>
};

export interface ReturnRoomEquip {
    resolution?: string
    equipIDs: Array<string>
};