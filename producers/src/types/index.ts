export type UserState = {
    loggedIn: boolean
}

export type SearchState = {
    searchResults: SearchResults
}

export type SearchRequestParams = {
    searchText: string
}

export type SearchResult = {
    id: string
    name: string
    image: string | null
}

export type SearchResults = SearchResult[]

export type ArtistCreditsResult = {
    id: number
    name: string
    type: string
}

export type ArtistCreditsResults = ArtistCreditsResult[]

export type ArtistRequestParams = {
    artistId: string
}