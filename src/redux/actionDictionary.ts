export const ERROR = 'ERROR';

// User Account Management Actions
export class USER_ACTIONS {
    static START_PROFILE_LOAD = 'START_PROFILE_LOAD';
    static FINISH_PROFILE_LOAD = 'FINISH_PROFILE_LOAD';
    static UPDATE_PROFILE = 'UPDATE_USER_PROFILE';
};

// Group Viewing Actions
export class GROUP_LIST_ACTIONS {
    static START_GROUP_LIST_LOAD = 'START_GROUP_LIST_LOAD';
    static FINISH_GROUP_LIST_LOAD = 'FINISH_GROUP_LIST_LOAD';
};

// Room Viewing Actions
export class ROOM_LIST_ACTIONS {
    static START_ROOM_LIST_LOAD = 'START_ROOM_LIST_LOAD';
    static FINISH_ROOM_LIST_LOAD = 'FINISH_ROOM_LIST_LOAD';
};