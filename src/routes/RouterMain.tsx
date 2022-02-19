import {
    Route,
    Routes
} from "react-router-dom"

import Home from "../components/home/Home"
import Layout from "../components/layout/Layout";
import PageNotFound from "../components/notfound/PageNotFound";
import EquipDirectory from "../components/equip/EquipDirectory";
import EquipProfile from "../components/equip/EquipProfile";
import EquipSession from "../components/equip/EquipSession";
import RoomDirectory from "../components/room/RoomDirectory";
import RoomSession from "../components/room/RoomSession";
import UserAccountManagement from "../components/user/UserAccountManagement";
import UserDirectory from "../components/user/UserDirectory";
import UserProfile from "../components/user/UserProfile";
import UserLogin from "../components/user/UserLogin";
import UserRegister from "../components/user/UserRegister";
import GroupDirectory from "../components/group/GroupDirectory";
import GroupProfile from "../components/group/GroupProfile";
import GroupManagement from "../components/group/GroupManagement";
import ExploreHome from "../components/explore/exploreHome";
import ExploreGroups from "../components/explore/exploreGroups";
import ExploreRooms from "../components/explore/exploreRooms";
import ExploreEquip from "../components/explore/exploreEquip";


const RouterMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                <Route path="explore" element={< ExploreHome />} />
                <Route path="explore/groups" element={< ExploreGroups />} />
                <Route path="explore/rooms" element={< ExploreRooms />} />
                <Route path="explore/equip" element={< ExploreEquip />} />


                <Route path="equip" element={< EquipDirectory />} />
                <Route path="equip/:equipID" element={<EquipProfile />} />
                <Route path="equip/:equipID/session" element={<EquipSession />} />

                <Route path="users" element={<UserDirectory />} />
                <Route path="users/:username" element={<UserProfile />} />
                <Route path="uam" element={<UserAccountManagement />} />
                
                <Route path="groups" element={<GroupDirectory />} />
                <Route path="groups/:groupID" element={<GroupProfile />} />
                <Route path="groups/:groupID/gm" element={<GroupManagement />} />
            
                <Route path="rooms" element={<RoomDirectory />} />
                <Route path="rooms/:roomID" element={<RoomSession />} />

                <Route path="login" element={<UserLogin />} />
                <Route path="register" element={<UserRegister />} />
                <Route path="*" element={<PageNotFound />} />
            </ Route>
        </Routes>
    )
}

export default RouterMain;