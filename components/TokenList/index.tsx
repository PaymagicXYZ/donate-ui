import _ from "lodash";
import { useTokenList, useLocalCurrency } from "../../hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  VStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tokenId: number) => void;
}

export default function TokenList(props: Props) {
  const { isOpen, onClose, onSelect } = props;
  const tokens = useTokenList();
  const localCurrency = useLocalCurrency();

  const handleSelect = (tokenId: number) => {
    onSelect(tokenId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a token</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll" maxH="60vh" px="0px">
          <HStack
            px="20px"
            py="10px"
            transitionDuration="100ms"
            onClick={() => handleSelect(-1)}
            _hover={{
              background: "gray.100",
              cursor: "pointer",
            }}
          >
            <Image
              marginRight="5px"
              boxSize="25px"
              src={localCurrency.logoURI}
              borderRadius="100px"
              alt={localCurrency.symbol}
            />
            <VStack alignItems="start" spacing="0px">
              <Text fontSize="md">{localCurrency.symbol}</Text>
              <Text fontSize="xs">{localCurrency.name}</Text>
            </VStack>
            <Spacer />
            <Text>{localCurrency.balance.toFixed(5)}</Text>
          </HStack>
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
                // alt={token.symbol}
              />
              <VStack alignItems="start" spacing="0px">
                <Text fontSize="md">{token.symbol}</Text>
                <Text fontSize="xs">{token.name}</Text>
              </VStack>
              <Spacer />
              <Text>
                {!token.balance || Number.isInteger(token.balance)
                  ? token.balance
                  : token.balance.toFixed(5)}
              </Text>
            </HStack>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
