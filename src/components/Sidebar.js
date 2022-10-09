import { Box, Divider, Heading, Icon, Image, ListItem, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronRight, ChevronLeft, Command, Clipboard, Server, LogOut, UserPlus, List } from 'react-feather'
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../api';
import './sidebar.css'

function Sidebar() {
    const [userRole, setUserRole] = useState('')
    let token = localStorage.getItem('auth')
    const [toggle, setToggle] = useState(false)
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
        // const List = document.querySelectorAll('.list');

        // function activeLink() {
        //     List.forEach((item) =>
        //         item.classList.remove('active'));
        //     this.classList.add('active');
        // }

        // List.forEach((item) =>
        //     item.addEventListener('click', activeLink));

    }, [])
    return (
        <div className="navigation">
            {/* <Box bg='white' py={2} px={4} borderRadius={'md'} display='flex' alignItems='center' ml={toggle ? ('2') : ('')}>
                {toggle ? (
                    <Image display={toggle ? ('block') : ('none')} src='https://ik.imagekit.io/o0spphqdc/Asset_1_2x_5yv7dh7TI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664816975154'
                        objectFit='contain'
                        alt='Levya' w='100%' h='30px' />
                ) : (
                    // <Image src='https://ik.imagekit.io/o0spphqdc/Asset_2_2x_E9vIncDEz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664816975136'
                    //     alt='Levya' w='100%' h='30px' objectFit='contain' />
                )}
            </Box> */}
            <Box py={2} px={4} borderRadius={'md'} display='flex' alignItems='center' justifyContent='center'>
                <Image display='block' my={2} mx={4} src='https://ik.imagekit.io/o0spphqdc/Asset_1_2x_5yv7dh7TI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664816975154'
                    objectFit='contain'
                    alt='Levya' w='100%' h='30px' />
            </Box>
            <ul>
                <li
                    id='dashboard'
                    //add active class to the list item
                    className="list"
                    onClick={() => {
                        navigate('/')
                        //add active class to the list item
                        // const List = document.querySelectorAll('.list');
                        // List.forEach((item) => {
                        //     item.classList.remove('active')
                        // })
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
                            //add active class to the list item
                            // const List = document.querySelectorAll('.list');
                            // List.forEach((item) => {
                            //     item.classList.remove('active')
                            // })
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
                        //add active class to the list item
                        // const List = document.querySelectorAll('.list');
                        // List.forEach((item) => {
                        //     item.classList.remove('active')
                        // })
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
                        //add active class to the list item
                        // const List = document.querySelectorAll('.list');
                        // List.forEach((item) => {
                        //     item.classList.remove('active')
                        // })
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