import createFilter from 'redux-persist-transform-filter'
import storage from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'
import { searchReducer } from './searchSlice'


const saveSubsetFilter = createFilter(
    'search',
    []
)

const persistConfig = {
    key: 'search',
    storage,
    whitelist: [],
    transforms: [saveSubsetFilter]
}

const persistedSearchReducer = persistReducer(persistConfig, searchReducer)

export default persistedSearchReducer