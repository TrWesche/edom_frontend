export const ERROR = 'ERROR';

// User Account Management Actions
export class USER_ACTIONS {
    static START_PROFILE_LOAD = 'START_PROFILE_LOAD';
    static FINISH_PROFILE_LOAD_PUBLIC = 'FINISH_PROFILE_LOAD_PUBLIC';
    static FINISH_PROFILE_LOAD_PRIVATE = 'FINISH_PROFILE_LOAD_PRIVATE';
    static UPDATE_PROFILE = 'UPDATE_USER_PROFILE';
};

// Group List Actions
export class GROUP_LIST_ACTIONS {
    static START_GROUP_LIST_LOAD = 'START_GROUP_LIST_LOAD';
    static FINISH_GROUP_LIST_LOAD = 'FINISH_GROUP_LIST_LOAD';
};

// Room List Actions
export class ROOM_LIST_ACTIONS {
    static START_ROOM_LIST_LOAD = 'START_ROOM_LIST_LOAD';
    static FINISH_ROOM_LIST_LOAD = 'FINISH_ROOM_LIST_LOAD';
};

// Equip List Actions
export class EQUIP_LIST_ACTIONS {
    static START_EQUIP_LIST_LOAD = 'START_EQUIP_LIST_LOAD';
    static FINISH_EQUIP_LIST_LOAD = 'FINISH_EQUIP_LIST_LOAD';
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