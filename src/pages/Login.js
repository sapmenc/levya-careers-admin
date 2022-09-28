import React, { useRef, useState } from 'react'
import { Button, Heading, Image, Input, Stack, useToast } from '@chakra-ui/react';
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
                    <Stack
                        rounded={'15px'}
                        bg='white' py={5} px={10} w='md'
                        align='center' spacing={5}>
                        <Heading
                            color='#5f5f5f'
                        >
                            Careers Portal
                        </Heading>
                        <Input
                            px={5}
                            py={2}
                            variant='unstyled'
                            border={'1px solid #EF940B'}
                            ref={emailRef}
                            type='email' placeholder='Email' fontWeight='extrabold' />
                        <Input
                            px={5}
                            py={2}
                            variant='unstyled'
                            border={'1px solid #EF940B'}
                            ref={passwordRef}
                            type='password' placeholder='Password' fontWeight='extrabold' />
                        <Button
                            variant='unstyled'
                            bg='white'
                            color='#EF940B'
                            border={'1px solid #EF940B'}
                            px={5}
                            py={2}
                            w='50%'
                            onClick={() => handleLogin()}>Login</Button>
                        <Stack direction='row' w='100%' justify='end' >
                            <Image
                                src='https://ik.imagekit.io/q8qsfnr9wag/Asset_1_2x_Aed07oRMi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663682194939'
                                alt='Levya' w='100px' h='30px'
                                objectFit={'contain'} />
                        </Stack>
                    </Stack>
                ) : (
                    <Stack
                        h='300px'
                        spacing={20}
                        rounded={'15px'}
                        bg='white' py={5} px={10} w='md'
                        align='center'>
                        <Heading
                            color='#5f5f5f'
                        >
                            Careers Portal
                        </Heading>
                        <Button
                            variant='unstyled'
                            bg='white'
                            color='#EF940B'
                            border={'1px solid #EF940B'}
                            px={5}
                            py={2}
                            w='xs'
                            onClick={() => setShow(true)}>Login
                        </Button>
                        <Stack direction='row' w='100%' justify='end' >
                            <Image
                                src='https://ik.imagekit.io/q8qsfnr9wag/Asset_1_2x_Aed07oRMi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663682194939'
                                alt='Levya' w='100px' h='30px'
                                objectFit={'contain'} />
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
}

export default Login