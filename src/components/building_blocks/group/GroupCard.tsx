import {
    Button,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    CardMedia
} from "@mui/material"

import { GroupObjectProps } from '../../../interfaces/globalInterfaces';

const GroupCard = (data: GroupObjectProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src="https://www.scuttlerobot.org/images/virtuemart/product/Scuttle-Render-Assembled-Base-1280x720.jpg"
                    alt="Scuttle Robot Picture"
                />
                <CardContent
                    sx={{
                        height: '100px',
                        textOverflow: 'ellipsis' 
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.headline}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Management Actions Area?
                </Button>
            </CardActions>
        </Card>          
    )
};

export default GroupCard;