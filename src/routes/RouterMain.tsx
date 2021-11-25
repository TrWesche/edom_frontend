import {
    Route,
    Routes
} from "react-router-dom"

import Home from "../components/home/Home"
import Layout from "../components/layout/Layout";
import PageNotFound from "../components/notfound/PageNotFound";
import RobotDirectory from "../components/robot/RobotDirectory";
import RobotProfile from "../components/robot/RobotProfile";
import RobotSession from "../components/robot/RobotSession";
import RoomDirectory from "../components/room/RoomDirectory";
import RoomSession from "../components/room/RoomSession";
import MemberAccountManagement from "../components/user/MemberAccountMgmt";
import MemberDirectory from "../components/user/MemberDirectory";
import MemberProfile from "../components/user/MemberProfile";
import UserLogin from "../components/user/UserLogin";
import UserRegister from "../components/user/UserRegister";


const RouterMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="robo" element={< RobotDirectory />} />
                <Route path="robo/:robotID" element={<RobotProfile />} />
                <Route path="robo/:robotID/session" element={<RobotSession />} />

                <Route path="mem" element={<MemberDirectory />} />
                <Route path="mem/:memberID" element={<MemberProfile />} />
                <Route path="mem/uam" element={<MemberAccountManagement />} />

                <Route path="room" element={<RoomDirectory />} />
                <Route path="room/:roomID" element={<RoomSession />} />

                <Route path="login" element={<UserLogin />} />
                <Route path="register" element={<UserRegister />} />
                <Route path="*" element={<PageNotFound />} />
            </ Route>
        </Routes>
    )
}

export default RouterMain;