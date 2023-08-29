import { useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import useApi from '../../utils/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../Loading'
import {
    Container,
    Box,
    TextField,
    InputAdornment,
    Typography,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@mui/material'


const Search = () => {

    const navigate = useNavigate()
    const { search, searchResults, searchQueryIsLoading } = useApi()
    const [searchText, setSearchText] = useState<string>('')

    const _handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)

    const _handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            search(searchText)
        }
    }

    const SearchResults = () => (
        <Table>
            <TableBody>
            {searchResults.map((row) => (
                <TableRow
                    hover
                    sx={{ cursor: 'pointer' }}
                    key={row.id}
                    onClick={() => navigate(`/artist/${row.id}`, { state: { name: row.name } })}
                >
                    <TableCell component='th' scope='row' align='center' width='10%'>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Avatar alt={row.name} src={row.image || 'https://ui-avatars.com/api/?name=' + row.name} />
                        </Box>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )

    return (
        <Container>
            <Box
                marginTop={5}
                p={5}
                border={1}
                borderColor='secondary.light'
                borderRadius={2}
                bgcolor={'secondary.main'}
                minHeight={500}
                display='flex'
                flexDirection='column'
            >
                <TextField
                    color='primary'
                    placeholder='search artists'
                    variant='outlined'
                    onKeyDown={_handleSubmit}
                    onChange={_handleSearchTextChange}
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                // borderColor: 'red', // regular
                            },
                            '&:hover fieldset': {
                                borderColor: 'text.secondary', // hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'text.primary', // active/focused
                                borderWidth: 1
                            },
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <Typography variant='h6' color='text.primary' sx={{ marginTop: 5 }}>
                    Search Results (press enter to search)
                </Typography>
                { searchQueryIsLoading ? <Loading /> : <SearchResults /> }
            </Box>
        </Container>
    )
}

export default Search