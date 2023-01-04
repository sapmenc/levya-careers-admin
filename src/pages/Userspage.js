import { Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../components/Sidebar'
import UserContent from '../components/UserContent'

function Userspage() {
    if (localStorage.getItem('auth') === null) {
        window.location.href = "/login"
    }
    return (
        <Flex bg='#e9ebf0' h='100vh'>
            <UserContent />
        </Flex>
    )
}

export default Userspage