import { Flex } from '@chakra-ui/react'
import React from 'react'
import Domains from '../components/Domains'
import Sidebar from '../components/Sidebar'

function Domainspage() {
    if (localStorage.getItem('auth') === null) {
        window.location.href = "/login"
    }
    return (
        <Flex bg='#e9ebf0' h='100vh'>
            <Sidebar />
            <Domains />
        </Flex>
    )
}

export default Domainspage