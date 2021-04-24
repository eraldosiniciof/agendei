import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFetch } from '@refetty/react'
import { addDays, format, subDays } from 'date-fns'
import axios from 'axios'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Container, Box, IconButton, SimpleGrid, Spinner, ModalOverlay, ModalContent, ModalFooter } from '@chakra-ui/react'

import { formatDate, Logo, TimeBlock } from '../components'

const getSchedule = async ({ when, username }) => axios({
    method: 'get',
    url: '/api/schedule',
    params: {
        username,
        date: format(when, 'yyyy-MM-dd')
    },
})

const Header = ({ children }) => (
    <Box p={4} display="flex" alignItems="center" justifyContent="center">
        {children}
    </Box>
)

export default function Schedule() {
    const router = useRouter()
    const [when, setWhen] = useState(() => new Date())
    const [data, { loading }, fetch] = useFetch(getSchedule, { lazy: true })

    const addDay = () => setWhen(prevState => addDays(prevState, 1))
    const removeDay = () => setWhen(prevState => subDays(prevState, 1))

    const refresh = () => fetch({ when, username: router.query.username })

    useEffect(() => {
        if (!router.query.username) return
        refresh()
    }, [when, router.query.username])

    return (
        <Container>
            <Header>
                <Logo />
            </Header>

            <Box mt={10} display="flex" alignItems="center">
                <IconButton bg="transparente" icon={<ChevronLeftIcon />} onClick={removeDay} />
                <Box flex="1" textAlign="center">{formatDate(when, 'PPPP')}</Box>
                <IconButton bg="transparente" icon={<ChevronRightIcon />} onClick={addDay} />
            </Box>

            <SimpleGrid padding={4} columns={2} spacing={4}>
                {loading && <Spinner tickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
                {data?.map(({ time, isBlocked }) => <TimeBlock key={time} time={time} date={when} disabled={isBlocked} onSuccess={refresh} />)}
            </SimpleGrid>
        </Container>
    )
}