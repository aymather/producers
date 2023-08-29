import { useDispatch, useSelector } from '../../redux'
import { action_login, action_logout } from '../../redux/user'

interface IUseUser {
    login: () => void
    logout: () => void
    loggedIn: boolean
}

const useUser = () : IUseUser => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const login = () => {
        dispatch(action_login())
    }

    const logout = () => {
        dispatch(action_logout())
    }

    return {
        login,
        logout,
        loggedIn: user.loggedIn
    }

}

export default useUser