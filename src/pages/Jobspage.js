import { Flex } from '@chakra-ui/react'
import React from 'react'
import JobContent from '../components/JobContent'
import Sidebar from '../components/Sidebar'

function Jobspage() {
  if(localStorage.getItem('auth') === null){
    window.location.href = "/login"
  }
  return (
    <>
      <Flex bg='#e9ebf0' h='100vh'>
        <Sidebar />
        <JobContent />
      </Flex>
    </>
  )
}

export default Jobspage