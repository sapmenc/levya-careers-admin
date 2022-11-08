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
    const [jobId, setJobId] = useState('')

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
                    duration: 2000,
                    isClosable: true,
                })
            }
            toast({
                title: "Success",
                description: data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            handleFetchAllJobs()
        } catch (err) {
            return toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 2000,
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
                    duration: 2000,
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
                duration: 2000,
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
                    duration: 2000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: "Success",
                    description: data.message,
                    status: "success",
                    duration: 2000,
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
                duration: 2000,
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
        if (jobId.length > 0) {
            let res = []
            res = fetchedJobs.filter((job) => job._id === jobId)
            console.log(res)
            return res
        }
        //destructure query to get searchQuery, searchDomain, searchStatus
        const { searchQuery, searchDomain, searchStatus } = query
        let result = fuse.search(searchQuery);
        if (searchDomain) {
            result = result.filter((job) => job.item.domain.name === searchDomain);
        }
        if (searchStatus) {
            result = result.filter((job) => job.item.status === searchStatus);
        }
        return result.map((job) => job.item);
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
                    <Input w='56' bg='white' type='text' onChange={
                        (e) => {
                            setJobId(e.target.value)
                        }
                    } value={jobId}
                        placeholder='job id' />
                    <Input w='56' bg='white' type='text' placeholder='Search' onChange={
                        (e) => {
                            setSearchQuery(e.target.value)
                        }
                    } value={searchQuery} />
                    <Select w='56' bg='white' placeholder='Select domain'
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
                    <Select w='56' bg='white' placeholder='Status' value={searchStatus}
                        onChange={(e) => {
                            // setIsSelectedActive(e.target.value),
                            setSearchStatus(e.target.value)
                        }}
                    >
                        <option
                            value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                    </Select>
                    <Box px={5} py={1} borderRadius='md' border='1px solid white' cursor='pointer'>
                        <Search size='28' onClick={() => {
                            if (!searchQuery && !jobId) {
                                return toast({
                                    title: "Error",
                                    description: "Please enter a search query",
                                    status: "error",
                                    duration: 3000,
                                    isClosable: true,
                                })
                            }
                            else {
                                setResultJobs(searchWithFuse({ searchQuery, searchDomain, searchStatus }))
                            }
                        }} />
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