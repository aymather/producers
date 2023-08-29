import { createTheme } from '@mui/material/styles'


const theme = createTheme({
    palette: {
        mode: 'dark', // Dark mode
        primary: {
            main: '#101418', // Material-UI's primary color
            light: '#8fc9f9'
        },
        secondary: {
            main: '#0f1924', // Material-UI's secondary color
            light: '#1f2933'
        },
        background: {
            default: '#101418', // Dark background color
            paper: '#1e1e1e', // Dark paper color
        },
        text: {
            primary: '#ffffff', // White text color
            secondary: '#a0a0a0', // Grayish text color
        }
    },
    typography: {
        fontFamily: 'Lato, Arial, sans-serif', // Use a similar font
    },
    shape: {
        borderRadius: 8, // Rounded corners similar to Material-UI
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Similar to Material-UI buttons
                }
            }
        }
    }
})

export default theme