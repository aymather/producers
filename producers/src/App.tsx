import './App.scss'
import { Auth } from './components/Auth'
import { ThemeProvider } from './mui'
import { CssBaseline } from '@mui/material'
import { store, persistor } from './redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<CssBaseline />
					<Auth />
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

export default App