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
            <Skeleton height="300px"/>
        </Box>
    )
};

export default UserCardSkeleton;