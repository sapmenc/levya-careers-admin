import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { fetchCurrentUser } from '../api'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/Sidebar'

function Homepage() {
  if (localStorage.getItem('auth') === null) {
    window.location.href = "/login"
  }
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