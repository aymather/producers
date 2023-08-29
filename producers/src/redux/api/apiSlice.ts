import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    SearchRequestParams,
    ArtistRequestParams,
    SearchResults,
    ArtistCreditsResults
} from '../../types'


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        search: builder.query<SearchResults, SearchRequestParams>({
            query: ({ searchText }) => ({
                url: '/search',
                method: 'GET',
                params: {
                    q: searchText
                }
            })
        }),
        artist: builder.query<ArtistCreditsResults, ArtistRequestParams>({
            query: ({ artistId }) => ({
                url: `/credits/${artistId}`,
                method: 'GET'
            })
        })
    })
})

export const {
    useLazySearchQuery,
    useArtistQuery
} = api

export default api.reducer