import { Flex } from '@chakra-ui/react'
import React from 'react'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/Sidebar'

function Homepage() {
  return (
    <>
      <Flex bg='#e9ebf0' h='100vh'>
        <Sidebar />
        <Dashboard />
      </Flex>
    </>
  )
}

export default Homepage