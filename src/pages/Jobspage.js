import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import JobContent from '../components/JobContent'
import Sidebar from '../components/Sidebar'

function Jobspage() {
  if (localStorage.getItem('auth') === null) {
    window.location.href = "/login"
  }
  return (
    <>
      <Flex bg='#e9ebf0' h='100vh'>
        <Box pos='absolute' left={'0'} bottom='0' top='10' zIndex='10'>
          <Sidebar />
        </Box>
        <JobContent />
      </Flex>
    </>
  )
}

export default Jobspage