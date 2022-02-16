// Material UI
import {
    Box,
    Skeleton
} from "@mui/material"

const RoomCardSkeleton = () => {
    return (
        <Box sx={{
            maxWidth: "345"
        }}>
            <Skeleton height="140px"/>
            <Skeleton height="100px"/>
        </Box>
    )
};

export default RoomCardSkeleton;