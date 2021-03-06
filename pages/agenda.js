import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFetch } from '@refetty/react'
import { addDays, subDays, format } from 'date-fns'
import axios from 'axios'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Container, Box, IconButton, Spinner, Text } from '@chakra-ui/react'

import { getToken } from './../config/firebase/client'
import { useAuth, Logo, formatDate } from './../components'

const getAgenda = async (when) => {
    const token = await getToken()

    return axios({
        method: 'get',
        url: '/api/agenda',
        params: { date: format(when, 'yyyy-MM-dd') },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const Header = ({ children }) => (
    <Box p={4} display="flex" alignItems="center" justifyContent="space-between">
        {children}
    </Box>
)

const AgendaBlock = ({ time, name, phone, ...props }) => (
    <Box {...props} display="flex" alignItems="center" bg="gray.100" borderRadius={8} padding={4}>
        <Box flex={1}>{time}</Box>
        <Box textAlign="right">
            <Text fontSize="2xl">{name}</Text>
            <Text>{phone}</Text>
        </Box>
    </Box>
)

export default function Agenda() {
    const router = useRouter()
    const [auth, { logout }] = useAuth()
    const [when, setWhen] = useState(() => new Date())
    const [data, { loading }, fetch] = useFetch(getAgenda, { lazy: true })

    const addDay = () => setWhen(prevState => addDays(prevState, 1))
    const removeDay = () => setWhen(prevState => subDays(prevState, 1))

    useEffect(() => {
        !auth.user && router.push('/')
    }, [auth.user])

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
            {loading && <Spinner tickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
            {data?.map(doc => (
                <AgendaBlock key={doc.time} time={doc.time} name={doc.name} phone={doc.phone} mt={4}/>
            ))}
        </Container>
    )
}