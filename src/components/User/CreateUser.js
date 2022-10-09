import { Input, Stack, useToast, Button, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../../api'

function CreateUser() {

    const toast = useToast()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')
    const [status, setStatus] = useState('active')

    const handleUserCreation = async (e) => {
        try {
            let body = {
                "name": name,
                "email": email,
                "password": password,
                "role": role,
                "status": status
            }
            const { data } = await signupUser(body)
            if (data.error) {
                return toast({
                    title: "Error",
                    description: "Error in creating user",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
            if (data.status) {
                toast({
                    title: "User Created",
                    description: "User has been created successfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                navigate('/users')
            }
        }
        catch (err) {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <Stack m={5} p={5} spacing={5} align='center' w={'100%'} >
            <Heading>Create a user</Heading>
            <Input
                w='md'
                bg='white'
                type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <Input
                w='md'
                bg='white'
                type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
                w='md'
                bg='white'
                type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input
                w='md'
                bg='white'
                type='text' placeholder='Role' value={role} onChange={(e) => setRole(e.target.value)} disabled />
            <Input
                w='md'
                bg='white'
                type='text' placeholder='Status' value={status} onChange={(e) => setStatus(e.target.value)} disabled />
            <Button onClick={handleUserCreation}>Create User</Button>
        </Stack>
    )
}

export default CreateUser