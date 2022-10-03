import { Circle, Flex, Heading, Stack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { fetchAllJobs } from '../api'

function Dashboard() {
    const [jobs, setJobs] = useState([])
    const toast = useToast()
    const handleFetchAllJobs = async () => {
        try {
            const { data } = await fetchAllJobs()
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Success",
                    description: data.message,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                })
                setJobs(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleFetchAllJobs()
    }, [])
    return (
        <Flex
            m='2'
            p='6'
            borderRadius='md'
            w='100%'
            h='80vh'
            justifyContent='space-evenly'
            alignItems='center' >
            <Stack border='1px' h={'64'} pos='relative' w={'64'} align='center' justify='center'>
                <Circle
                    color='white'
                    shadow='lg'
                    size={'32'}
                    bg='magenta'
                    pos='absolute'
                    top='-16'
                    fontWeight='bold'
                    fontSize='5xl'
                >
                    {jobs?.length}
                </Circle>
                <Heading>Job Posts</Heading>
            </Stack>
            <Stack border='1px' h={'64'} pos='relative' w={'64'} align='center' justify='center'>
                <Circle
                   color='white'
                   shadow='lg'
                   size={'32'}
                   bg='magenta'
                   pos='absolute'
                   top='-16'
                   fontWeight='bold'
                   fontSize='5xl'
                >
                    5
                </Circle>
                <Heading>Applicants</Heading>
            </Stack>
        </Flex>
    )
}

export default Dashboard