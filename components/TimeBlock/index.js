import { useState } from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react'

const ModalTimeBlock = ({ isOpen, onClose, time }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Horário: {time}
            </ModalBody>

            <ModalFooter>
                <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Reservar horário
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
)

export const TimeBlock = ({ time }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(prevState => !prevState)
    return (
        <Button p={8} bg="blue.500" color="white" onClick={toggle}>
            {time}
            <ModalTimeBlock isOpen={isOpen} onClose={toggle} time={time}/>
        </Button>
    )
}