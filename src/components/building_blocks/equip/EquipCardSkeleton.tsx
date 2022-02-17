import {
    Box,
    Skeleton
} from "@mui/material"

const EquipCardSkeleton = () => {
    return (
        <Box sx={{
            maxWidth: "345"
        }}>
            <Skeleton height="140px"/>
            <Skeleton height="100px"/>
        </Box>
    )
};

export default EquipCardSkeleton;