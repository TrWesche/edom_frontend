import {
    Route,
    Routes
} from "react-router-dom"

import Layout from "../components/layout/Layout";

import Home from "../components/tier01/landing/Home"

import UserRegister from "../components/tier01/user/UserRegister";
import UserLogin from "../components/tier01/user/UserLogin";
import UserAccount from "../components/tier01/user/UserAccount";
import UserUpdateAccount from "../components/tier01/user/UserUpdateAccount";
import UserUpdatePassword from "../components/tier01/user/UserUpdatePassword";
import UserProfile from "../components/tier01/user/UserProfile";
import GroupDirectoryUser from "../components/tier01/group/GroupDirectoryUser";
import EquipDirectoryUser from "../components/tier01/directories/EquipDirectoryUser";
import RoomDirectoryUser from "../components/tier01/directories/RoomDirectoryUser";

import GroupProfile from "../components/tier01/group/GroupProfile";
import GroupManagement from "../components/tier01/group/GroupManagement";
import EquipDirectoryGroup from "../components/tier01/directories/EquipDirectoryGroup";
import RoomDirectoryGroup from "../components/tier01/directories/RoomDirectoryGroup";
import UserDirectoryGroup from "../components/tier01/directories/UserDirectoryGroup";
import UserDirectorySite from "../components/tier01/directories/UserDirectorySite";

import ExploreHome from "../components/tier01/search/exploreHome";
import ExploreGroups from "../components/tier01/search/exploreGroups";
import ExploreRooms from "../components/tier01/search/exploreRooms";
import ExploreEquip from "../components/tier01/search/exploreEquip";

import EquipProfile from "../components/tier01/equipment/EquipProfile";

import RoomProfile from "../components/tier01/hub/RoomProfile";
import RoomSession from "../components/tier01/hub/RoomSession";

import PageNotFound from "../components/tier01/notfound/PageNotFound";



const RouterMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<ExploreHome />} />

                <Route path="users" element={<UserDirectorySite />} />
                <Route path="users/:username" element={<UserProfile />} />

                <Route path="dm/:username/groups" element={<GroupDirectoryUser />} />
                <Route path="dm/:username/equip" element={<EquipDirectoryUser />} />
                <Route path="dm/:username/rooms" element={<RoomDirectoryUser />} />
                
                <Route path="dm/account" element={<UserAccount />} />
                <Route path="dm/account/edit" element={<UserUpdateAccount />} />
                <Route path="dm/account/cpw" element={<UserUpdatePassword />} />

                <Route path="groups" element={<ExploreGroups />} />
                <Route path="groups/:groupID" element={<GroupProfile />} />
                <Route path="groups/:groupID/users" element={<UserDirectoryGroup />} />
                <Route path="groups/:groupID/equip" element={<EquipDirectoryGroup />} />
                <Route path="groups/:groupID/rooms" element={<RoomDirectoryGroup />} />
                <Route path="groups/:groupID/gm" element={<GroupManagement />} />
                
                <Route path="equip" element={<ExploreEquip />} />
                <Route path="equip/:equipID" element={<EquipProfile />} />

                <Route path="rooms" element={<ExploreRooms />} />
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