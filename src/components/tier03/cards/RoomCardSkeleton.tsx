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
            <Skeleton height="300px"/>
        </Box>
    )
};

export default RoomCardSkeleton;