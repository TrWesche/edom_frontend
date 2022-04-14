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
    username?: string
    groupid?: string
    name?: string
    category: string
    image_url?: string
    headline?: string
    description?: string
    public_room?: boolean
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