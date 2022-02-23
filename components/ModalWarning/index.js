import {useState, useEffect} from 'react'
import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Link,
  Center,
  Checkbox,
  CheckboxGroup,
  Stack,
  useDisclosure
} from "@chakra-ui/react";

export default function ModalWarning() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const [scrollBehavior, setScrollBehavior] = useState('inside')
  const [checkedItems, setCheckedItems] = useState([false, false, false])
  const [isCachedOpen, setIsCachedOpen] = useState('')

  useEffect(() => {
    setIsCachedOpen(localStorage.getItem("isCachedOpen"))
  }, [])

  function handleClose() {
    localStorage.setItem("isCachedOpen", 'false')
    setIsCachedOpen('false')
    onClose
  }

  return (
    <>

      {false && <Button onClick={onOpen}>Open Modal</Button>}

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen && isCachedOpen!=='false'}
        onClose={onClose}
        isCentered
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px)'
        />
        <ModalContent>
          <ModalHeader><Center>⚠️⚠️⚠️Warning⚠️⚠️⚠️</Center></ModalHeader>
          <ModalBody pb={6}>
            <Stack spacing={5}>
              <Checkbox
                colorScheme='purple'
                size='lg'
                isChecked={checkedItems[0]}
                onChange={() => setCheckedItems([!checkedItems[0],checkedItems[1],checkedItems[2]])}
              >
                I understand this is experimental software and I may lose my ETH or tokens.
              </Checkbox>
              <Checkbox
                colorScheme='purple'
                size='lg'
                isChecked={checkedItems[1]}
                onChange={() => setCheckedItems([checkedItems[0],!checkedItems[1],checkedItems[2]])}
              >
                I understand the quoted price is not guaranteed and will change with the <Link href={'https://data.chain.link/ethereum/mainnet'} isExternal>Chainlink Oracle price</Link>.
              </Checkbox>
              <Checkbox
                colorScheme='purple'
                size='lg'
                isChecked={checkedItems[2]}
                onChange={() => setCheckedItems([checkedItems[0],checkedItems[1],!checkedItems[2]])}
              >
                I assume all risk from interacting with this application and smart contracts.
              </Checkbox>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Center>
              <Button
                colorScheme='purple'
                isDisabled={!checkedItems[0] || !checkedItems[1] || !checkedItems[2]}
                onClick={handleClose}
              >
                I assume all risk
              </Button>
            </Center>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}