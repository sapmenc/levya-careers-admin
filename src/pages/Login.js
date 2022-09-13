import React, { useRef, useState } from 'react'
import {  Button, Heading, Input, Stack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const toast = useToast()
    const handleLogin = () => {
        if (!emailRef.current.value || !passwordRef.current.value)
            return toast({
                title: "Error",
                description: "Please fill in all fields",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        if (emailRef.current.value === "admin@gmail.com" && passwordRef.current.value === "admin") {
            toast({
                title: "Success",
                description: "Login successful",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            navigate('/')
        }
    }
    return (
        <Stack
            align='center'
            justifyContent='center'
            w='100%' h='100vh'
            bgGradient='linear(to-l, #F4DC92, #D0A07A,#363F68)'>
            <Stack>
                {show ? (
                    <Stack bg='white' py={5} px={10} w='xl'
                        align='center' spacing={5}>
                        <Heading>Careers Portal</Heading>
                        <Input ref={emailRef} type='email' placeholder='Email' fontWeight='extrabold' />
                        <Input ref={passwordRef} type='password' placeholder='Password' fontWeight='extrabold' />
                        <Button variant='outline' onClick={() => handleLogin()}>Login</Button>
                        <Heading alignSelf='end'>Logo</Heading>
                    </Stack>
                ) : (
                    <Button onClick={() => setShow(true)}>Login</Button>
                )}
            </Stack>
        </Stack>
    )
}

export default Login