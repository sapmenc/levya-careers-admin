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
    Stack
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Country, State, City } from 'country-state-city';
import { addJob, fetchAllDomains } from '../../api';
import { useNavigate } from 'react-router-dom';

function CreateJob() {
    const token = localStorage.getItem('auth');
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
    const [state_code, setStateCode] = useState('');
    const [country_code, setCountryCode] = useState('');
    const [hybrid, setHybrid] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!jobTitle || !jobDesc || !selectedDomain || !country || !state || !city) {
                return toast({
                    title: "Error",
                    description: "Please fill all the fields",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            let body = {
                "title": jobTitle,
                "domain": selectedDomain,
                "description": jobDesc,
                "highPriority": urgent,
                "remote": remote,
                "hybrid": hybrid,
                "city": city,
                "state": state,
                "state_code": state_code,
                "country": country,
                "country_code": country_code,
            }
            const { data } = await addJob(body, token)

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
            const { data } = await fetchAllDomains(token)
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
        <Stack spacing={5} align='center' w={'100%'} my={10}>
            <Heading size='md' textAlign={'center'}>NEW JOB POST</Heading>
            <Box p='4' w='60%' justifyContent={'center'} mx='64'>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <Stack spacing={10}>
                            <Input
                                borderColor='purple'
                                borderWidth={2}
                                bg='white' type='text' placeholder='Job Title' w={'2xl'} onChange={(e) => setJobTitle(e.target.value)} />
                            <Textarea
                                borderColor='purple'
                                borderWidth={2}
                                bg='white' cols={10} placeholder='Job Description' mt='3' onChange={(e) => setJobDesc(e.target.value)} />
                            <Flex alignItems={'center'} mt='3' gap={2}>
                                <Select
                                    borderColor='purple'
                                    borderWidth={2}
                                    bg='white' placeholder='Select Domain' textTransform='capitalize' onChange={(e) => setSelectedDomain(e.target.value)}>
                                    {domains && domains.map((domain, i) => (
                                        <option key={i} value={domain._id}>{domain.name}</option>
                                    ))}
                                </Select>
                                <Select
                                    borderColor='purple'
                                    borderWidth={2}
                                    bg='white' placeholder='Select Country' onChange={(e) => {
                                        let country_code = e.target.value.split('_')[0]
                                        let country = e.target.value.split('_')[1]
                                        setCountry(country)
                                        setCountryCode(country_code)
                                        console.log(country, country_code)
                                    }}>
                                    {Country.getAllCountries().map((country, i) => (
                                        <option key={i} value={country.isoCode + "_" + country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </Select>
                                <Select
                                    borderColor='purple'
                                    borderWidth={2}
                                    bg='white' placeholder='Select State' onChange={(e) => {
                                        let state_code = e.target.value.split('_')[0]
                                        let state = e.target.value.split('_')[1]
                                        setState(state)
                                        setStateCode(state_code)
                                        console.log(state, state_code)
                                    }}>
                                    {State.getStatesOfCountry(country_code).map((state, i) => (
                                        <option key={i} value={state.isoCode + "_" + state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </Select>
                                <Select
                                    borderColor='purple'
                                    borderWidth={2}
                                    bg='white' placeholder='Select City' value={city} onChange={(e) => setCity(e.target.value)}>
                                    {City.getCitiesOfState(country_code, state_code).map((city, i) => (
                                        <option key={i} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Select>
                            </Flex>
                            <Flex mt='3' gap={5}>
                                <Checkbox
                                    borderColor='purple'
                                    borderWidth={2}
                                    p={2}
                                    bg='white' onChange={(e) => setUrgent(e.target.checked)}>Is Urgent Opening</Checkbox>
                                <Checkbox
                                    borderColor='purple'
                                    borderWidth={2}
                                    p={2}
                                    bg='white' onChange={(e) => setRemote(e.target.checked)} >Is Remote</Checkbox>
                                <Checkbox
                                    borderColor='purple'
                                    borderWidth={2}
                                    p={2}
                                    bg='white' onChange={(e) => setHybrid(e.target.checked)} >Is Hybrid</Checkbox>
                            </Flex>

                            <Flex>
                                <Button colorScheme='magenta' variant='outline' mx='auto' type='submit' w='xl'>PUBLISH</Button>
                            </Flex>
                        </Stack>
                    </FormControl>
                </form>
            </Box>
        </Stack >
    )
}

export default CreateJob