import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useArtistQuery } from '../../redux/api/apiSlice'
import { Loading } from '../Loading'
import { Error } from '../Error'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useTheme } from '@mui/material/styles'
import {
    Box,
    Container,
    FormControlLabel,
    IconButton,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from '@mui/material'

type SortOrder = 'asc' | 'desc'
type SortField = 'id' | 'name' | 'type'

const Artist = () => {

    const theme = useTheme()
    const navigate = useNavigate()
    const { artist_id } = useParams<{ artist_id: string }>()
    const location = useLocation()
    const { data, isLoading, error } = useArtistQuery({ artistId: artist_id || '' })
    const goBackToHome = () => navigate('/')

    const [selectedType, setSelectedType] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
    const [sortField, setSortField] = useState<SortField>('id')

    useEffect(() => {
        if (data) {
            const initialType = Array.from(new Set(data.map((item) => item.type)))[0]
            setSelectedType(initialType)
        }
    }, [data])

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value)
    }

    const getFilteredData = () => {
        if (data) {
            return (
                [...data].sort((a, b) => {
                    if (a[sortField] < b[sortField]) {
                        return sortOrder === 'asc' ? -1 : 1
                    }
                    if (a[sortField] > b[sortField]) {
                        return sortOrder === 'asc' ? 1 : -1
                    }
                    return 0
                }).filter((item) => item.type === selectedType)
            )
        } else { return [] }
    }

    const handleSort = (field: SortField) => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        setSortField(field)
    }

    const getUniqueTypes = () => {
        if (data) {
            return Array.from(new Set(data.map((item) => item.type)))
        } else { return [] }
    }

    const Credits = () => {
        if (data) {
            return (
                <Container>
                    <Box my={4}>
                        {getUniqueTypes().map((type, index) => (
                            <FormControlLabel
                                label={type}
                                key={index}
                                control={
                                    <Radio
                                        checked={selectedType === type}
                                        onChange={handleTypeChange}
                                        value={type}
                                        style={{ color: theme.palette.primary.light }}
                                    />
                                }
                            />
                        ))}
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['ID', 'Name', 'Type'].map((headCell, index) => (
                                    <TableCell key={index}>
                                        <TableSortLabel
                                            active={sortField === headCell.toLowerCase()}
                                            direction={sortOrder}
                                            onClick={() => handleSort(headCell.toLowerCase() as SortField)}
                                        >
                                            {headCell}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getFilteredData().map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            )
        } else {
            return <></>
        }
    }

    return (
        <Container sx={{ marginTop: '50px', padding: '50px', minHeight: '50vh', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" alignItems="center">
                <IconButton onClick={goBackToHome} color="primary">
                    <ArrowBackIcon style={{ color: theme.palette.primary.light }} />
                </IconButton>
                <Typography variant='h4' fontWeight='bolder'>
                    {location.state.name || 'Artist: ' + artist_id}
                </Typography>
            </Box>
            {
                isLoading ? <Loading />
                : error ? <Error />
                : data && <Credits />
            }
        </Container>
    )
}

export default Artist