import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFetch } from '@refetty/react'
import axios from 'axios'
import { addDays, format, subDays } from 'date-fns'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Container, Box, IconButton, SimpleGrid, Spinner, ModalOverlay, ModalContent, ModalFooter } from '@chakra-ui/react'

import { formatDate, useAuth, Logo, TimeBlock} from './../components'

const getSchedule = async (when) => axios({
    method: 'get',
    url: '/api/schedule',
    params: { when, username: window.location.pathname },
})

const Header = ({ children }) => (
    <Box p={4} display="flex" alignItems="center" justifyContent="space-between">
        {children}
    </Box>
)

export default function Agenda() {
    const router = useRouter()
    const [auth, { logout }] = useAuth()
    const [when, setWhen] = useState(() => new Date())
    const [data, { loading, status, error }, fetch] = useFetch(getSchedule, { lazy: true })

    const addDay = () => setWhen(prevState => addDays(prevState, 1))
    const removeDay = () => setWhen(prevState => subDays(prevState, 1))

    useEffect(() => {
        fetch(when)
    }, [when])

    return (
        <Container>
            <Header>
                <Logo size={175} />
                <Button onClick={logout}>Sair</Button>
            </Header>

            <Box mt={10} display="flex" alignItems="center">
                <IconButton bg="transparente" icon={<ChevronLeftIcon />} onClick={removeDay} />
                <Box flex="1" textAlign="center">{formatDate(when, 'PPPP')}</Box>
                <IconButton bg="transparente" icon={<ChevronRightIcon />} onClick={addDay} />
            </Box>

            <SimpleGrid padding={4} columns={2} spacing={4}>
                {loading && <Spinner tickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
                {data?.map(time => <TimeBlock key={time} time={time} />)}
            </SimpleGrid>
        </Container>
    )
}