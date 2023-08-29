import { useDispatch, useSelector } from '../../redux'
import { useLazySearchQuery } from '../../redux/api/apiSlice'
import { action_search } from '../../redux/search'
import { SearchResults } from '../../types'


interface IUseApi {
    search: (q: string) => void
    searchResults: SearchResults
    searchQueryIsLoading: boolean
}

const useApi = () : IUseApi => {

    const [ searchQuery, { isLoading: searchQueryIsLoading } ] = useLazySearchQuery()

    const dispatch = useDispatch()
    const searchState = useSelector(state => state.search)

    const search = (searchText: string) => {
        searchQuery({ searchText })
            .then(res => dispatch(action_search(res.data || [])))
            .catch(err => console.log(err))
    }

    return {
        search,
        searchResults: searchState.searchResults,
        searchQueryIsLoading
    }

}

export default useApi