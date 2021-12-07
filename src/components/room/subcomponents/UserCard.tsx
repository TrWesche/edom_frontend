import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography
} from "@mui/material";


const UserCard = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/edom/blobstore/u1359u-234uiu4-2115.jpg"
                    alt="This will be a users profile picture or a default pic"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        User Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        An optional blurb about the user
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default UserCard;