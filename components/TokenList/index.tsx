import _ from "lodash";
import { useTokenList } from "../../hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  HStack,
  VStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tokenId: number) => void;
  balances: { string: number };
}

export default function TokenList(props: Props) {
  const { isOpen, onClose, onSelect, balances } = props;
  const tokens = useTokenList();

  const handleSelect = (tokenId: number) => {
    onSelect(tokenId);
    onClose();
  };

  const getBalance = (address = "") => {
    if (balances) return balances[address.toLowerCase()] || 0;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a token</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll" maxH="60vh" px="0px">
          {tokens.map((token, i) => (
            <HStack
              key={token.address}
              px="20px"
              py="10px"
              transitionDuration="100ms"
              onClick={() => handleSelect(i)}
              _hover={{
                background: "gray.100",
                cursor: "pointer",
              }}
            >
              <Image
                marginRight="5px"
                boxSize="25px"
                src={token.logoURI}
                borderRadius="100px"
                alt={token.symbol}
              />
              <VStack alignItems="start" spacing="0px">
                <Text fontSize="md">{token.symbol}</Text>
                <Text fontSize="xs">{token.name}</Text>
              </VStack>
              <Spacer />
              <Text>{getBalance(token.address)}</Text>
            </HStack>
          ))}
        </ModalBody>

        <ModalFooter>Footer</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
