import { ThemeProvider as MUIThemeProvider } from '@mui/material'
import theme from './theme'

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeProvider : React.FC<ThemeProviderProps> = ({ children }) => {
    return (
        <MUIThemeProvider theme={theme}>
            {children}
        </MUIThemeProvider>
    )
}

export default ThemeProvider