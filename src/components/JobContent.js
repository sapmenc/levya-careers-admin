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
    Switch,
    Spinner
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Search } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { fetchAllDomains, fetchAllJobs, updateJob } from '../api'
import Fuse from "fuse.js";

function JobContent() {
    let token = localStorage.getItem('auth')
    const navigate = useNavigate()
    const toast = useToast()
    const [fetchedJobs, setFetchedJobs] = useState([])
    const [resultJobs, setResultJobs] = useState([])
    const [domains, setDomains] = useState([])
    const [isSelectedActive, setIsSelectedActive] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchDomain, setSearchDomain] = useState('')
    const [searchStatus, setSearchStatus] = useState('')

    const handleUpdateJobStatus = async (id, status) => {
        setLoading(true)
        try {
            let body = {
                "status": status
            }
            const { data } = await updateJob(body, token, id)
            if (data.error) {
                return toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            toast({
                title: "Success",
                description: data.message,
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            handleFetchAllJobs()
        } catch (err) {
            return toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        } finally {
            setLoading(false)
        }
    }
    const handleFetchAllDomains = async () => {
        try {
            const { data } = await fetchAllDomains(token)
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
            const { data } = await fetchAllJobs(token)
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
        keys: ["title", "domain.name", "country", "state", "city", "_id"],
    };
    const fuse = new Fuse(fetchedJobs, options);

    const searchWithFuse = (query) => {
        console.log(query)
        if (!query) {
            return [];
        }
        console.log(fuse.search({
            $or: [
                // { title: searchQuery },
                { "domain.name": `'${query.searchDomain}` },
                // { country: query.searchQuery },
                // { state: query.searchQuery },
                // { city: query.searchQuery },
                // { _id: query.searchQuery },
                // { status: query.searchStatus }
            ],
        }));
        let result = []
        result = fuse.search(query).map((result) => result.item);
        return result
    }
    useEffect(() => {
        handleFetchAllJobs()
        handleFetchAllDomains()
        console.log(resultJobs)
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
                    colorScheme='magenta'
                    bg='white'
                >
                    Add Job
                </Button>
            </Stack>
            <Stack align='center' h='80vh' overflow={'auto'}>
                <Stack bg='secondary' p={5} zIndex={4} direction='row' align='center' pos='fixed'>
                    <Input w='sm' bg='white' type='text' placeholder='Search' onChange={
                        (e) => {
                            setSearchQuery(e.target.value)
                        }
                    } value={searchQuery} />
                    <Select w='sm' bg='white' placeholder='Select domain'
                        onChange={
                            (e) => {
                                setSearchDomain(e.target.value)
                            }
                        }
                    >
                        {domains.map((domain) => {
                            return (
                                <option key={domain._id} value={domain.name}>{domain.name}</option>
                            )
                        })}
                    </Select>
                    <Select w='sm' bg='white' placeholder='Status' value={searchStatus}
                        onChange={(e) => {
                            // setIsSelectedActive(e.target.value),
                            setSearchStatus(e.target.value)
                        }}
                    >
                        <option
                            value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                    </Select>
                    <Box px={5} py={1} borderRadius='md' border='1px solid white'>
                        <Search size='30' onClick={() => setResultJobs(searchWithFuse({ searchQuery, searchDomain, searchStatus }))} />
                    </Box>
                </Stack>
                <Stack>
                    <TableContainer mt={20} rounded='md' bgColor='white'>
                        <Table variant='striped' colorScheme={'purple'}>
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
                            <Tbody top={10}>
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
                                                    }} bgColor='secondary' color='white'>
                                                        Edit
                                                    </Button>
                                                    <Switch
                                                        disabled={loading}
                                                        isChecked={job.status === 'active' ? true : false}
                                                        onChange={() => {
                                                            if (job.status === 'active') {
                                                                handleUpdateJobStatus(job._id, "inactive")
                                                            }
                                                            else {
                                                                handleUpdateJobStatus(job._id, "active")
                                                            }
                                                        }}
                                                        colorScheme='purple' />

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
                                                        }} bgColor='secondary' color='white'>
                                                            Edit
                                                        </Button>
                                                        <Switch
                                                            disabled={loading}
                                                            isChecked={job.status === 'active' ? true : false}
                                                            onChange={() => {
                                                                if (job.status === 'active') {
                                                                    handleUpdateJobStatus(job._id, "inactive")
                                                                }
                                                                else {
                                                                    handleUpdateJobStatus(job._id, "active")
                                                                }
                                                            }}
                                                            colorScheme='purple' />

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