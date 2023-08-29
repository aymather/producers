import React, { useState } from 'react'
import { InputAdornment, TextField, Typography } from '@mui/material'
import useUser from '../../utils/hooks/useUser'
import { LockOutlined } from '@mui/icons-material'


const NotLoggedIn = () => {

    const { login } = useUser()
    const [password, setPassword] = useState<string>('')

    const _handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const _handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (password === 'aleciscool') {
                login()
            }
        }
    }

    return (
        <div className='not-logged-in p-5'>
            <Typography variant='h5' sx={{ marginTop: '28px', marginBottom: '28px' }}>
                Who do you know here...?
            </Typography>
            <TextField
                color='primary'
                placeholder='password'
                type='password'
                variant='outlined'
                onChange={_handlePasswordInputChange}
                onKeyDown={_handleSubmit}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <LockOutlined />
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export default NotLoggedIn