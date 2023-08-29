import createFilter from 'redux-persist-transform-filter'
import storage from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'
import { userReducer } from './userSlice'


const saveSubsetFilter = createFilter(
    'user',
    ['loggedIn']
)

const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['loggedIn'],
    transforms: [saveSubsetFilter]
}

const persistedSearchReducer = persistReducer(persistConfig, userReducer)

export default persistedSearchReducer