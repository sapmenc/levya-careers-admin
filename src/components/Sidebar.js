import { Box, Divider, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Command, Clipboard, Server, LogOut, UserPlus } from 'react-feather'
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../api';
import './sidebar.css'

function Sidebar() {
    const [userRole, setUserRole] = useState('')
    let token = localStorage.getItem('auth')
    const navigate = useNavigate();
    const getCurrentUser = async () => {
        const { data } = await fetchCurrentUser(token)
        if (data.error) {
            window.location.href = "/login"
        }
        setUserRole(data.data.role)
    }
    useEffect(() => {
        getCurrentUser()
    }, [])
    return (
        <div className="navigation">
            <Box py={2} px={4} borderRadius={'md'} display='flex' alignItems='center' justifyContent='center'>
                <Image display='block' my={2} mx={4} src="https://ik.imagekit.io/o0spphqdc/Ample_Logo_BOFaUuOQn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671344685069"
                    objectFit='contain'
                    alt='Levya' w='100%' h='30px' />
            </Box>
            <ul>
                <li
                    id='dashboard'
                    className="list"
                    onClick={() => {
                        navigate('/')
                        document.getElementById('dashboard').classList.add('active')
                    }}
                >
                    <span className="icon">
                        <Command color='#FFF' />
                    </span>
                    <span className="title">Dashboard</span>
                </li>
                {userRole === 'admin' && (
                    <li
                        id='users'
                        className="list"
                        onClick={() => {
                            navigate('/users')
                            document.getElementById('users').classList.add('active')
                        }}>
                        <span className="icon">
                            <UserPlus color='#FFF' />
                        </span>
                        <span className="title">User Management</span>
                    </li>
                )}
                <li
                    id='jobs'
                    className="list "
                    onClick={() => {
                        navigate('/jobs')
                        document.getElementById('jobs').classList.add('active')
                    }}>
                    <span className="icon">
                        <Clipboard color='#FFF' />
                    </span>
                    <span className="title">Job Posts</span>
                </li>
                <li
                    id='domains'
                    className="list "
                    onClick={() => {
                        navigate('/domains')
                        document.getElementById('domains').classList.add('active')
                    }}>
                    <span className="icon">
                        <Server color='#FFF' />
                    </span>
                    <span className="title">Domains</span>
                </li>
                <Divider />
                <li
                    className="list"
                    onClick={() => {
                        navigate('/login')
                    }}>
                    <span className="icon">
                        <LogOut color='#FFF' />
                    </span>
                    <span className="title">Sign out</span>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar