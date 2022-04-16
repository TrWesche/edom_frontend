import {
    Box,
    Skeleton
} from "@mui/material"

const EquipCardSkeleton = () => {
    return (
        <Box sx={{
            flexGrow: 1
        }}>
            <Skeleton height="300px"/>
        </Box>
    )
};

export default EquipCardSkeleton;