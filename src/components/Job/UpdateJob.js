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
import { fetchAllDomains, fetchJobById, updateJob } from '../../api';
import { useNavigate } from 'react-router-dom';

function UpdateJob(props) {
  const { jid } = props
  console.log(jid)
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
          duration: 2000,
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
      const { data } = await updateJob(body, token)

      if (data.status) {
        toast({
          title: "Job Created",
          description: "Job has been updated successfully",
          status: "success",
          duration: 2000,
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
        setDomains(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleCurrenJob = async () => {
    try {
      const { data } = await fetchJobById(token, jid.id)
      if (data.status) {
        toast({
          title: "Success",
          description: "Job details fetched successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
        console.log(data.data)
        setCity(data.data.city)
        setCountry(data.data.country)
        setCountryCode(data.data.country_code)
        setJobDesc(data.data.description)
        setJobTitle(data.data.title)
        setRemote(data.data.remote)
        setUrgent(data.data.highPriority)
        setHybrid(data.data.hybrid)
        setState(data.data.state)
        setStateCode(data.data.state_code)
        setSelectedDomain(data.data.domain)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleFetchAllDomains()
    handleCurrenJob()
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
                value={jobTitle}
                bg='white' type='text'
                placeholder='Job Title' w={'2xl'} onChange={(e) => setJobTitle(e.target.value)} />
              <Textarea
                borderColor='purple'
                borderWidth={2}
                bg='white'
                cols={10}
                value={jobDesc}
                placeholder='Job Description' mt='3' onChange={(e) => setJobDesc(e.target.value)} />
              <Flex alignItems={'center'} mt='3' gap={2}>
                <Select
                  borderColor='purple'
                  borderWidth={2}
                  value={selectedDomain}
                  bg='white' placeholder='Select Domain' textTransform='capitalize' onChange={(e) => setSelectedDomain(e.target.value)}>
                  {domains && domains.map((domain, i) => (
                    <option key={i} value={domain._id}>{domain.name}</option>
                  ))}
                </Select>
                <Select
                  borderColor='purple'
                  borderWidth={2}
                  value={country}
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
                  value={state}
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
                  value={city}
                  bg='white' placeholder='Select City' onChange={(e) => setCity(e.target.value)}>
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
                <Button colorScheme='magenta' variant='outline' mx='auto' type='submit' w='xl'>UPDATE</Button>
              </Flex>
            </Stack>
          </FormControl>
        </form>
      </Box>
    </Stack >
  )
}

export default UpdateJob