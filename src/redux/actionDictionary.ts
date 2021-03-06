export const ERROR = 'ERROR';

// User Account Management Actions
export class USER_ACTIONS {
    static START_USER_LOAD = 'START_USER_LOAD';
    static FINISH_USER_LOAD = 'FINISH_USER_LOAD';

    static START_USER_UPDATE = 'START_USER_UPDATE';
    static FINISH_USER_UPDATE = 'FINISH_USER_UPDATE';
};

// User List Actions
export class USER_LIST_ACTIONS {
    static START_USER_LIST_LOAD = 'START_USER_LIST_LOAD';
    static FINISH_USER_LIST_LOAD = 'FINISH_USER_LIST_LOAD';
    static START_GROUP_USER_LIST_LOAD = 'START_GROUP_USER_LIST_LOAD';
    static FINISH_GROUP_USER_LIST_LOAD = 'FINISH_GROUP_USER_LIST_LOAD';
};



// Group Actions
export class GROUP_ACTIONS {
    static START_GROUP_LOAD = 'START_GROUP_LOAD';
    static START_GROUP_CREATE = 'START_GROUP_CREATE';
    static START_GROUP_UPDATE = 'START_GROUP_UPDATE';
    static START_GROUP_DELETE = 'START_GROUP_DELETE';
    static FINISH_GROUP_LOAD = 'FINISH_GROUP_LOAD';
    static FINISH_GROUP_CREATE = 'FINISH_GROUP_CREATE';
    static FINISH_GROUP_UPDATE = 'FINISH_GROUP_UPDATE';
    static FINISH_GROUP_DELETE = 'FINISH_GROUP_DELETE';
};

// Group User Management Actions
export class GROUP_MGMT_USERS_ACTIONS {
    static START_GROUP_ADD_USER = 'START_GROUP_ADD_USER';
    static FINISH_GROUP_ADD_USER = 'FINISH_GROUP_ADD_USER';
    static START_GROUP_REMOVE_USER = 'START_GROUP_REMOVE_USER';
    static FINISH_GROUP_REMOVE_USER = 'FINISH_GROUP_REMOVE_USER';

    static START_USER_ROLES_LOAD = 'START_USER_ROLES_LOAD';
    static FINISH_USER_ROLES_LOAD = 'FINISH_USER_ROLES_LOAD';
    static START_USER_ROLES_CREATE = 'START_USER_ROLES_CREATE';
    static FINISH_USER_ROLES_CREATE = 'FINISH_USER_ROLES_CREATE';
    static START_USER_ROLES_DELETE = 'START_USER_ROLES_DELETE';
    static FINISH_USER_ROLES_DELETE = 'FINISH_USER_ROLES_DELETE';
};

// Group Role Management Actions
export class GROUP_MGMT_ROLES_ACTIONS {
    static START_GROUP_ROLES_LOAD = 'START_GROUP_ROLES_LOAD';
    static FINISH_GROUP_ROLES_LOAD = 'FINISH_GROUP_ROLES_LOAD';
    static START_GROUP_ROLES_CREATE = 'START_GROUP_ROLES_CREATE';
    static FINISH_GROUP_ROLES_CREATE = 'FINISH_GROUP_ROLES_CREATE';
    static START_GROUP_ROLES_DELETE = 'START_GROUP_ROLES_DELETE';
    static FINISH_GROUP_ROLES_DELETE = 'FINISH_GROUP_ROLES_DELETE';

    static START_GROUP_ROLE_LOAD_PERMISSIONS = 'START_GROUP_ROLE_LOAD_PERMISSIONS';
    static FINISH_GROUP_ROLE_LOAD_PERMISSIONS = 'FINISH_GROUP_ROLE_LOAD_PERMISSIONS';
    static START_GROUP_ROLE_ADD_PERMISSIONS = 'START_GROUP_ROLE_ADD_PERMISSIONS';
    static FINISH_GROUP_ROLE_ADD_PERMISSIONS = 'FINISH_GROUP_ROLE_ADD_PERMISSIONS';
    static START_GROUP_ROLE_REMOVE_PERMISSIONS = 'START_GROUP_ROLE_REMOVE_PERMISSIONS';
    static FINISH_GROUP_ROLE_REMOVE_PERMISSIONS = 'FINISH_GROUP_ROLE_REMOVE_PERMISSIONS';
};

// Group List Actions
export class GROUP_LIST_ACTIONS {
    static START_GROUP_LIST_LOAD = 'START_GROUP_LIST_LOAD';
    static FINISH_GROUP_LIST_LOAD = 'FINISH_GROUP_LIST_LOAD';
    static START_USER_GROUP_LIST_LOAD = 'START_USER_GROUP_LIST_LOAD';
    static FINISH_USER_GROUP_LIST_LOAD = 'FINISH_USER_GROUP_LIST_LOAD';
};


// Room Actions
export class ROOM_ACTIONS {
    static START_ROOM_CREATE = 'START_ROOM_CREATE';
    static FINISH_ROOM_CREATE = 'FINISH_ROOM_CREATE';
    static START_ROOM_LOAD = 'START_ROOM_LOAD';
    static FINISH_ROOM_LOAD = 'FINISH_ROOM_LOAD';
    static START_ROOM_UPDATE = 'START_ROOM_UPDATE';
    static FINISH_ROOM_UPDATE = 'FINISH_ROOM_UPDATE';
    static START_ROOM_DELETE = 'START_ROOM_DELETE';
    static FINISH_ROOM_DELETE = 'FINISH_ROOM_DELETE';
};

// Room List Actions
export class ROOM_LIST_ACTIONS {
    static START_ROOM_LIST_LOAD = 'START_ROOM_LIST_LOAD';
    static FINISH_ROOM_LIST_LOAD = 'FINISH_ROOM_LIST_LOAD';
    static START_USER_ROOM_LIST_LOAD = 'START_USER_ROOM_LIST_LOAD';
    static FINISH_USER_ROOM_LIST_LOAD = 'FINISH_USER_ROOM_LIST_LOAD';
    static START_GROUP_ROOM_LIST_LOAD = 'START_GROUP_ROOM_LIST_LOAD';
    static FINISH_GROUP_ROOM_LIST_LOAD = 'FINISH_GROUP_ROOM_LIST_LOAD';
};


// Room Actions
export class EQUIP_ACTIONS {
    static START_EQUIP_CREATE = 'START_EQUIP_CREATE';
    static FINISH_EQUIP_CREATE = 'FINISH_EQUIP_CREATE';
    static START_EQUIP_LOAD = 'START_EQUIP_LOAD';
    static FINISH_EQUIP_LOAD = 'FINISH_EQUIP_LOAD';
    static START_EQUIP_UPDATE = 'START_EQUIP_UPDATE';
    static FINISH_EQUIP_UPDATE = 'FINISH_EQUIP_UPDATE';
    static START_EQUIP_DELETE = 'START_EQUIP_DELETE';
    static FINISH_EQUIP_DELETE = 'FINISH_EQUIP_DELETE';
};

// Equip List Actions
export class EQUIP_LIST_ACTIONS {
    static START_EQUIP_LIST_LOAD = 'START_EQUIP_LIST_LOAD';
    static FINISH_EQUIP_LIST_LOAD = 'FINISH_EQUIP_LIST_LOAD';
    static START_USER_EQUIP_LIST_LOAD = 'START_USER_EQUIP_LIST_LOAD';
    static FINISH_USER_EQUIP_LIST_LOAD = 'FINISH_USER_EQUIP_LIST_LOAD';
    static START_GROUP_EQUIP_LIST_LOAD = 'START_GROUP_EQUIP_LIST_LOAD';
    static FINISH_GROUP_EQUIP_LIST_LOAD = 'FINISH_GROUP_EQUIP_LIST_LOAD';
    static START_ROOM_EQUIP_LIST_LOAD = 'START_ROOM_EQUIP_LIST_LOAD';
    static FINISH_ROOM_EQUIP_LIST_LOAD = 'FINISH_ROOM_EQUIP_LIST_LOAD';
};

