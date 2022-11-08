import React from 'react'
import Sidebar from '../components/Sidebar'
import { Flex } from '@chakra-ui/react'
import UpdateJob from '../components/Job/UpdateJob'
import { useParams } from 'react-router-dom'

function EditJobpage(props) {
    const jid = useParams()
    console.log('jid', jid)
    if (localStorage.getItem('auth') === null) {
        window.location.href = "/login"
    }
    return (
        <Flex bg='#e9ebf0' h='100vh'>
            <Sidebar />
            <UpdateJob jid={jid} />
        </Flex>
    )
}

export default EditJobpage