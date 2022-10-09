import { Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../components/Sidebar'
import CreateUser from '../components/User/CreateUser'

function CreateJobpage() {
    return (
            <Flex bg='#e9ebf0' h='100vh'>
                <Sidebar />
                <CreateUser />
            </Flex>
    )
}

export default CreateJobpage