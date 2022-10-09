import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Box, Button, GridItem, Heading, Input, SimpleGrid, Stack, Text, useToast, CloseButton
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MinusCircle } from 'react-feather'
import { addDomain, deleteDomain, fetchAllDomains } from '../api'

function Domains() {
    let token = localStorage.getItem('auth')
    const toast = useToast()
    const [domains, setDomains] = useState([])
    const [newDomain, setNewDomain] = useState('')
    const [domainId, setDomainId] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteDomain = (id) => {
        setDomainId(id)
        onOpen()
    }
    const finalDeleteDomain = async () => {
        if (domainId === '') {
            return toast({
                title: "Error",
                description: "Domain ID not found",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        try {
            const { data } = await deleteDomain(domainId)
            if (data.error) {
                toast({
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
                handleFetchAllDomains()
                onClose()
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
    const handleFetchAllDomains = async () => {
        try {
            const { data } = await fetchAllDomains(token)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: "Success",
                    description: data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
                setDomains(data.data)
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
    const handleAddDomain = async () => {
        if (newDomain === '') {
            return toast({
                title: "Error",
                description: "Please enter a domain",
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        }
        try {
            let body = {
                "name": newDomain
            }
            const { data } = await addDomain(body, token)
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
                toast({
                    title: "Success",
                    description: data.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                handleResetDomain()
                handleFetchAllDomains()
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
    const handleResetDomain = () => {
        setNewDomain('')
    }
    useEffect(() => {
        handleFetchAllDomains()
    }, [])
    return (
        <Box w='100%' overflowX='hidden'>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <CloseButton />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>All jobs associated with this domain will get deleted !!</Text>
                        <Text>Do you still want to delete this domain?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => finalDeleteDomain()}>
                            Delete
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Heading textAlign='center'>All Domains</Heading>
            <SimpleGrid
                m={2}
                p={2}
                w='100%'
                 columns={2}>
                <GridItem w='50%' mx='auto'>
                    <Stack align={'end'} spacing={2}>
                        <Input rounded='md' bg='white' type='text'
                            value={newDomain}
                            placeholder='New Domain Title' onChange={(e) => setNewDomain(e.target.value)} size='sm' />
                        <Button onClick={() => handleAddDomain()}
                            variant='outline'
                            colorScheme='purple'
                            bg='white'>
                            Add
                        </Button>
                    </Stack>
                </GridItem>
                <GridItem w='50%' mx='auto' border='1px solid gray'>
                    <Stack bg='white' spacing={1} p={1}>
                        {domains.length>0 && domains?.map((domain, index) => (
                            <Stack p={2} bg='gray.200' w='100%' justify='space-between' key={index} direction='row'>
                                <Text flexGrow='1' textTransform='capitalize'>{domain.name}</Text>
                                <MinusCircle onClick={() => handleDeleteDomain(domain._id)} />
                            </Stack>
                        ))}
                    </Stack>
                </GridItem>
            </SimpleGrid>
        </Box>
    )
}

export default Domains