// Material UI
import {
    Box,
    Skeleton
} from "@mui/material"

const RoomCardSkeleton = () => {
    return (
        <Box sx={{
            flexGrow: 1
        }}>
            <Skeleton height="200px"/>
            <Skeleton height="100px"/>
        </Box>
    )
};

export default RoomCardSkeleton;