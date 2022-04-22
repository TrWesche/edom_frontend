import {
    Button,
    ButtonGroup,
    Grid,
    Paper
} from "@mui/material";

// import {
//     ArrowUpward,
//     ArrowDownward,
//     ArrowForward as ArrowRight,
//     ArrowBack as ArrowLeft
// } from "@mui/icons-material";


const ButtonBar = () => {
    return (
        <Paper>
            <Grid xs={12} md={4}>
                <Grid xs={4} />
                <Grid xs={4}>
                    <Button>W</Button>
                </Grid>
                <Grid xs={4} />
                <Grid xs={4}>
                    <Button>A</Button>
                </Grid>
                <Grid xs={4}>
                    <Button>S</Button>
                </Grid>
                <Grid xs={4}>
                    <Button>D</Button>
                </Grid>
            </Grid>
            <Grid xs={12} md={8}>
                <ButtonGroup>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                    <Button>5</Button>
                    <Button>6</Button>
                    <Button>7</Button>
                    <Button>8</Button>
                    <Button>9</Button>
                    <Button>0</Button>
                </ButtonGroup>
            </Grid>
        </Paper>
    )
}

export default ButtonBar;