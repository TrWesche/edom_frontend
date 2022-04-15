// Material UI
import {
    Box,
    Skeleton
} from "@mui/material"

const UserCardSkeleton = () => {
    return (
        <Box sx={{
            flexGrow: 1
        }}>
            <Skeleton height="200px"/>
            <Skeleton height="100px"/>
        </Box>
    )
};

export default UserCardSkeleton;