import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Stack,
    Select,
    Heading,
    useToast,
    TableContainer,
    Td,
    Tr,
    Tbody,
    Th,
    Thead,
    Table,
    Input,
    Switch
} from '@chakra-ui/react'
import { fetchAllUsers } from '../api'
import { useNavigate } from 'react-router-dom'

function UserContent() {
    let token = localStorage.getItem('auth')
    const toast = useToast()
    const navigate = useNavigate()
    const [fetchedUsers, setFetchedUsers] = useState([])
    const handleFetchAllUsers = async () => {
        try {
            const { data } = await fetchAllUsers(token)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
            else {
                setFetchedUsers(data.data)
            }
        }
        catch (err) {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    }
    useEffect(() => {
        handleFetchAllUsers()
    }, [])
    return (
        <Box
            m='2'
            p='6'
            borderRadius='md'
            w='100%'
            h='95vh'
        >
            <Heading textAlign='center'>User Management</Heading>
            <Stack m='2' direction='row' justify='end'>
                <Button onClick={() => {
                    return navigate('/createuser');
                }}
                    variant='outline'
                    colorScheme='magenta'
                    bg='white'
                >
                    Add User
                </Button>
            </Stack>
            <Stack h='80vh' overflow={'auto'}>
                <Stack>
                    <TableContainer rounded='md' bgColor='white'>
                        <Table variant='striped' colorScheme={'purple'}>
                            <Thead>
                                <Tr>
                                    <Th>User Id</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Status</Th>
                                    <Th>Role</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {fetchedUsers?.map((user) => {
                                    return (
                                        <Tr key={user._id}>
                                            <Td>{user._id}</Td>
                                            <Td>{user.name}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.status}</Td>
                                            <Td>{user.role}</Td>
                                            <Td>
                                                <Stack spacing={5} align='center' direction='row'>
                                                    <Button onClick={() => {
                                                        return navigate(`/editjob/${user._id}`);
                                                    }} bgColor='purple' color='white'>
                                                        Edit
                                                    </Button>
                                                    <Button onClick={() => {
                                                        return navigate(`/delete/${user._id}`);
                                                    }} bgColor='purple' color='white'>
                                                        Delete
                                                    </Button>
                                                    <Switch isChecked={user.status === 'active' ?
                                                        true : false} colorScheme='purple' />
                                                </Stack>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>
        </Box>
    )
}

export default UserContent