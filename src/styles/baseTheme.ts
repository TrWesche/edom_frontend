import { createTheme } from "@mui/material";

const theme = createTheme({
    spacing: 4,
    palette: {
        common: {
            white: '#FAFAFA'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
    },
    shape: {
        borderRadius: 4
    }
})

export default theme;