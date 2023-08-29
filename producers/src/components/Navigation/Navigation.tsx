import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Search } from '../Search'
import { Artist } from '../Artist'


const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/',
                element: <Search />
            },
            {
                path: '/artist/:artist_id',
                element: <Artist />
            }
        ]
    }
])

const Navigation = () => {
    return <RouterProvider router={router} />
}

export default Navigation