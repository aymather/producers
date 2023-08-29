import { useTheme } from '@mui/material/styles'
import { Box, CircularProgress } from '@mui/material'

const Loading = () => {

    const theme = useTheme()

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flex: 1 }}>
            <CircularProgress style={{ color: theme.palette.primary.light }} />
        </Box>
    )
}

export default Loading