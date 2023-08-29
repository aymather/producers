import './Auth.scss'
import NotLoggedIn from './NotLoggedIn'
import LoggedIn from './LoggedIn'
import useUser from '../../utils/hooks/useUser'

const Auth : React.FC = () => {

    const { loggedIn } = useUser()

    return loggedIn ? <LoggedIn /> : <NotLoggedIn />
}

export default Auth