import {
    Box,
    Select,
    Input,
    Textarea,
    Heading,
    Flex,
    Checkbox,
    Button,
    FormControl,
    useToast,
    Switch,
    Stack
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Country, State, City } from 'country-state-city';
import { addJob, fetchAllDomains } from '../../api';
import { useNavigate } from 'react-router-dom';

function CreateJob() {
    const toast = useToast()
    const navigate = useNavigate()
    const [jobTitle, setJobTitle] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [domains, setDomains] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [remote, setRemote] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                "title": jobTitle,
                "description": jobDesc,
                "city": city,
                "state": state,
                "country": country,
                "isRemote": remote,
                "isUrgentOpening": urgent,
                "domain": selectedDomain
            }
            console.log(body)
            const { data } = await addJob(body)

            if (data.status) {
                toast({
                    title: "Job Created",
                    description: "Job has been created successfully",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                navigate('/jobs')
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }
    const handleFetchAllDomains = async () => {
        try {
            const { data } = await fetchAllDomains()
            if (data.status) {
                toast({
                    title: "Success",
                    description: "Domains fetched successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setDomains(data.data)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        handleFetchAllDomains()
    }, [])
    useEffect(() => {
    }, [country, state, city])

    return (
        <Stack spacing={5} align='center' w={'100%'}>
            <Heading size='md' textAlign={'center'}>NEW JOB POST</Heading>
            <Box p='4' w='60%' justifyContent={'center'} mx='64'>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <Stack spacing={10}>
                        <Input bg='white' type='text' placeholder='Job Title' w={150} onChange={(e) => setJobTitle(e.target.value)} />
                        <Textarea bg='white' cols={10} placeholder='Job Description' mt='3' onChange={(e) => setJobDesc(e.target.value)} />
                        <Flex alignItems={'center'} mt='3' gap={2}>
                            <Select placeholder='Select Domain' textTransform='capitalize' onChange={(e) => setSelectedDomain(e.target.value)}>
                                {domains && domains.map((domain, i) => (
                                    <option key={i} value={domain._id}>{domain.name}</option>
                                ))}
                            </Select>
                            <Select placeholder='Select Country' value={country} onChange={(e) => setCountry(e.target.value)}>
                                {Country.getAllCountries().map((country, i) => (
                                    <option key={i} value={country.isoCode}>
                                        {country.name}
                                    </option>
                                ))}
                            </Select>
                            <Select placeholder='Select State' value={state} onChange={(e) => setState(e.target.value)}>
                                {State.getStatesOfCountry(country).map((state, i) => (
                                    <option key={i} value={state.isoCode}>
                                        {state.name}
                                    </option>
                                ))}
                            </Select>
                            <Select placeholder='Select City' value={city} onChange={(e) => setCity(e.target.value)}>
                                {City.getCitiesOfState(country, state).map((city, i) => (
                                    <option key={i} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex mt='3' gap={5}>
                            <Checkbox onChange={(e) => setUrgent(e.target.checked)}>Is Urgent Opening</Checkbox>
                            <Checkbox onChange={(e) => setRemote(e.target.checked)} >Is Remote</Checkbox>
                        </Flex>

                        <Flex>
                            <Button colorScheme='orange' variant='outline' mx='auto' type='submit'>PUBLISH</Button>
                        </Flex>
                        </Stack>
                    </FormControl>
                </form>
            </Box>
        </Stack>
    )
}

export default CreateJob