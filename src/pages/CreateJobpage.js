import { Flex } from '@chakra-ui/react'
import React from 'react'
import CreateJob from '../components/Job/CreateJob'
import Sidebar from '../components/Sidebar'

function CreateJobpage() {
    return (
        <>
            <Flex bg='#e9ebf0' h='100vh'>
                <Sidebar />
                <CreateJob />
            </Flex>
        </>
    )
}

export default CreateJobpage