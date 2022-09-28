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
import React, { useEffect, useState } from 'react'
import { Search } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { fetchAllDomains, fetchAllJobs } from '../api'
import Fuse from "fuse.js";

function JobContent() {
    const navigate = useNavigate()
    const toast = useToast()
    const [fetchedJobs, setFetchedJobs] = useState([])
    const [resultJobs, setResultJobs] = useState([])
    const [domains, setDomains] = useState([])
    const handleFetchAllDomains = async () => {
        try {
            const { data } = await fetchAllDomains()
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            else {
                setDomains(data.data)
            }
        }
        catch (err) {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }
    const handleFetchAllJobs = async () => {
        try {
            const { data } = await fetchAllJobs()
            if (data.error) {
                return toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: "Success",
                    description: data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setFetchedJobs(data.data)
            }
        }
        catch (err) {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const options = {
        includeScore: true,
        keys: ["title", "domain.name", "country", "state", "city"],
    };
    const fuse = new Fuse(fetchedJobs, options);

    const searchWithFuse = (query) => {
        if (!query) {
            return [];
        }
        console.log(query)
        console.log(fuse.search(query));
        let result = []
        result = fuse.search(query).map((result) => result.item);
        return result
    }
    useEffect(() => {
        handleFetchAllJobs()
        handleFetchAllDomains()
    }, [resultJobs])
    return (
        <Box
            m='2'
            p='6'
            borderRadius='md'
            w='100%'
            h='95vh'
        >
            <Heading textAlign='center'>All Job Posts</Heading>
            <Stack m='2' direction='row' justify='end'>
                <Button onClick={() => {
                    return navigate('/createjob');
                }}
                    variant='outline'
                    colorScheme='orange'
                    bg='white'
                >
                    Add Job
                </Button>
            </Stack>
            <Stack h='80vh' overflow={'auto'}>
                <Stack direction='row'>
                    <Input bg='white' type='text' placeholder='Search' />
                    <Select bg='white' placeholder='Select domain'>
                        {domains.map((domain) => {
                            return (
                                <option key={domain._id} value={domain._id}>{domain.name}</option>
                            )
                        })}
                    </Select>
                    <Select bg='white' placeholder='Status'>
                        <option value='option1'>Active</option>
                        <option value='option2'>Inactive</option>
                    </Select>
                    <Search onClick={() => setResultJobs(searchWithFuse("sde 1"))} />
                </Stack>
                <Stack>
                    <TableContainer rounded='md' bgColor='white'>
                        <Table variant='striped' colorScheme={'orange'}>
                            <Thead>
                                <Tr>
                                    <Th>Job ID</Th>
                                    <Th>Job Title</Th>
                                    <Th>Job Domain</Th>
                                    <Th>Job Location</Th>
                                    <Th>Job Applicants</Th>
                                    <Th>Job Status</Th>
                                    <Th>Job Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {resultJobs.length > 0 ? resultJobs?.map((job) => {
                                    return (
                                        <Tr key={job._id}>
                                            <Td>{job._id}</Td>
                                            <Td>{job.title}</Td>
                                            <Td>{job.domain.name}</Td>
                                            <Td>{job.state + " " + job.country}</Td>
                                            <Td>{55}</Td>
                                            <Td>{job.status}</Td>
                                            <Td>
                                                <Stack spacing={5} align='center' direction='row'>
                                                    <Button onClick={() => {
                                                        return navigate(`/editjob/${job._id}`);
                                                    }} bgColor='white' color='black'>
                                                        Edit
                                                    </Button>
                                                    <Switch isChecked={job.status === 'active' ?
                                                        true : false} colorScheme='orange' />
                                                </Stack>
                                            </Td>
                                        </Tr>
                                    )
                                }
                                ) :
                                    fetchedJobs?.map((job) => {
                                        return (
                                            <Tr key={job._id}>
                                                <Td>{job._id}</Td>
                                                <Td>{job.title}</Td>
                                                <Td>{job.domain.name}</Td>
                                                <Td>{job.state + " " + job.country}</Td>
                                                <Td>{55}</Td>
                                                <Td>{job.status}</Td>
                                                <Td>
                                                    <Stack spacing={5} align='center' direction='row'>
                                                        <Button onClick={() => {
                                                            return navigate(`/editjob/${job._id}`);
                                                        }} bgColor='white' color='black'>
                                                            Edit
                                                        </Button>
                                                        <Switch isChecked={job.status === 'active' ?
                                                            true : false} colorScheme='orange' />
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

export default JobContent