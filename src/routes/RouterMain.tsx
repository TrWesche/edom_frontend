import {
    Route,
    Routes
} from "react-router-dom"

import Layout from "../components/layout/Layout";

import Home from "../components/home/Home"

import UserRegister from "../components/user/UserRegister";
import UserLogin from "../components/user/UserLogin";
import UserAccountManagement from "../components/user/UserAccountManagement";
import UserProfile from "../components/user/UserProfile";
import GroupDirectoryUser from "../components/group/GroupDirectoryUser";
import EquipDirectoryUser from "../components/equip/EquipDirectoryUser";
import RoomDirectoryUser from "../components/room/RoomDirectoryUser";

import GroupProfile from "../components/group/GroupProfile";
import GroupManagement from "../components/group/GroupManagement";
import EquipDirectoryGroup from "../components/equip/EquipDirectoryGroup";
import RoomDirectoryGroup from "../components/room/RoomDirectoryGroup";
import UserDirectoryGroup from "../components/user/UserDirectoryGroup";

import ExploreHome from "../components/explore/exploreHome";
import ExploreGroups from "../components/explore/exploreGroups";
import ExploreRooms from "../components/explore/exploreRooms";
import ExploreEquip from "../components/explore/exploreEquip";
import UserDirectorySite from "../components/user/UserDirectorySite";

import EquipProfile from "../components/equip/EquipProfile";

import RoomProfile from "../components/room/RoomProfile";
import RoomSession from "../components/room/RoomSession";

import PageNotFound from "../components/notfound/PageNotFound";


const RouterMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                <Route path="users" element={<UserDirectorySite />} />
                <Route path="users/:username" element={<UserProfile />} />
                <Route path="uam" element={<UserAccountManagement />} />

                <Route path="explore" element={< ExploreHome />} />
                <Route path="explore/groups" element={< ExploreGroups />} />
                <Route path="explore/rooms" element={< ExploreRooms />} />
                <Route path="explore/equip" element={< ExploreEquip />} />

                <Route path="groups" element={<GroupDirectoryUser />} />
                <Route path="groups/:groupID" element={<GroupProfile />} />
                <Route path="groups/:groupID/mgmt" element={<GroupManagement />} />
                <Route path="groups/:groupID/users" element={<UserDirectoryGroup />} />
                <Route path="groups/:groupID/equip" element={<EquipDirectoryGroup />} />
                <Route path="groups/:groupID/rooms" element={<RoomDirectoryGroup />} />

                <Route path="equip" element={< EquipDirectoryUser />} />
                <Route path="equip/:equipID" element={<EquipProfile />} />

                <Route path="rooms" element={<RoomDirectoryUser />} />
                <Route path="rooms/:roomID" element={<RoomProfile />} />
                <Route path="rooms/:roomID/session" element={<RoomSession />} />

                <Route path="login" element={<UserLogin />} />
                <Route path="register" element={<UserRegister />} />
                <Route path="*" element={<PageNotFound />} />
            </ Route>
        </Routes>
    )
}

export default RouterMain;