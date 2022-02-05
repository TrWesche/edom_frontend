import { createTheme, PaletteMode, PaletteColorOptions } from "@mui/material";
import { } from "@mui/material/styles"


// const colorPalette = (mode: PaletteMode) => ({
//     palette: {
//         mode,
//         ...(mode === 'light'
//           ? {
//               // palette values for light mode
//               primary: '#0a6ecc',
//               divider: amber[200],
//               text: {
//                 primary: grey[900],
//                 secondary: grey[800],
//               },
//             }
//           : {
//               // palette values for dark mode
//               primary: deepOrange,
//               divider: deepOrange[700],
//               background: {
//                 default: deepOrange[900],
//                 paper: deepOrange[900],
//               },
//               text: {
//                 primary: '#fff',
//                 secondary: grey[500],
//               },
//             }),
//       },
// });

const theme = createTheme({
    spacing: 4,
    palette: {
        primary: {
            main: '#0a6ecc',
            light: '#5e9cff',
            dark: '#00449a'
        },
        secondary: {
            main: '#cc680a',
            light: '#ff9740',
            dark: '#953b00'
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f'
        },
        info: {
            main: '#29b6f6',
            light: '#4fc3f7',
            dark: '#0288d1'
        },
        warning: {
            main: '#ffa726',
            light: '#ffb74d',
            dark: '#f57c00'
        },
        success: {
            main: '#66bb6a',
            light: '#81c784',
            dark: '#388e3c'
        },
        divider: '#fff',
        text: {
            primary: "#343434",
            secondary: '#808080',
        },
        background: {
            default: "#fff",
            paper: '#fff',
        },
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