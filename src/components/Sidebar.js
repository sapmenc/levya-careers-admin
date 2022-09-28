import { Box, Divider, Heading, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, Command, Clipboard, Server, LogOut } from 'react-feather'
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate();
    return (
        <Box
            mx='2'
            my='auto'
            p='6'
            borderRadius='md'
            minW={'40px'}
            maxW={'max-content'} 
            h='95vh' display='flex'
            flexDir={'column'}
            justifyContent='space-between'
            alignItems='center'
            boxShadow='lg'
            bg='white'
        >
            <Box>
                <Box display='flex' alignItems='center' ml={toggle ? ('2') : ('')}>
                    {toggle ? (
                        <Image display={toggle ? ('block') : ('none')} src='https://ik.imagekit.io/o0spphqdc/Asset_1_2x_aYEQjORqUu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664049781111'
                            objectFit='contain'
                            alt='Levya' w='100%' h='30px' />
                    ) : (
                        <Image src='https://ik.imagekit.io/o0spphqdc/Asset_2_2x_jeHz6Ng-S.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664049780718'
                            alt='Levya' w='100%' h='30px' objectFit='contain' />
                    )}
                </Box>
                <Box p={2} mt={'4'} display={'flex'} w={toggle ? ('200px') : ('')} flexDir='column' gap='15px'>
                    <Box
                        onClick={() => {
                            navigate('/')
                        }}
                        display='flex' alignItems='center' ml={toggle ? ('2') : ('')} gap='10px'>
                        <Command />
                        <Heading fontSize='md' display={toggle ? ('block') : ('none')}>Dashboard</Heading>
                    </Box>
                    <Box
                        onClick={() => {
                            navigate('/jobs')
                        }}
                        display='flex' alignItems='center' ml={toggle ? ('2') : ('')} gap='10px'>
                        <Clipboard />
                        <Heading fontSize='md' display={toggle ? ('block') : ('none')}>Job Posts</Heading>
                    </Box>
                    <Box
                        onClick={() => {
                            navigate('/domains')
                        }}
                        display='flex' alignItems='center' ml={toggle ? ('2') : ('')} gap='10px'>
                        <Server />
                        <Heading fontSize='md' display={toggle ? ('block') : ('none')}>Domains</Heading>
                    </Box>
                    <Divider />
                    <Box onClick={() => {
                        navigate('/login')
                    }}
                        display='flex' alignItems='center' ml={toggle ? ('2') : ('')} gap='10px'>
                        <LogOut />
                        <Heading fontSize='md' display={toggle ? ('block') : ('none')}>Sign out</Heading>
                    </Box>
                </Box>
            </Box>
            <Box cursor='pointer' >
                {toggle ? (
                    <ChevronLeft onClick={() => {
                        setToggle((ps) => !ps)
                    }} />
                ) : (
                    <ChevronRight onClick={() => {
                        setToggle((ps) => !ps)
                    }} />
                )}
            </Box>
        </Box>
    )
}

export default Sidebar