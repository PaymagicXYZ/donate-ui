import _ from "lodash";
import {
  useTokenList,
  useLocalCurrency,
  useIsSupportedNetwork,
  UserTokenData,
  LocalCurrencyData,
} from "../../hooks";
import {
  IconButton,
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
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Select from "../Select";
import { useEthers } from "@usedapp/core";

interface Props {
  onSelect: (tokenId: number) => void;
  selectedToken?: UserTokenData | LocalCurrencyData;
}

export default function TokenList(props: Props) {
  const { onSelect, selectedToken } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isSupportedNetwork = useIsSupportedNetwork();
  const { account } = useEthers();
  const tokens = useTokenList();
  const localCurrency = useLocalCurrency();

  const handleSelect = (tokenId: number) => {
    onSelect(tokenId);
    onClose();
  };

  return (
    <>
      <Select
        disabled={!account || !isSupportedNetwork}
        value={selectedToken?.symbol}
        logoURI={selectedToken?.logoURI}
        placeHolderText="Pick a token"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} w="modal.width">
        <ModalOverlay blur="2px" filter="auto" />{" "}
        <ModalContent bg="modal.active">
          <ModalHeader p="24px" color="text">
            <HStack>
              <Text color="text">Select a token</Text> <Spacer />{" "}
              <IconButton
                autoFocus={false}
                bg="modal.active"
                _hover={{ bg: "modal.hover" }}
                onClick={onClose}
                color="text"
                aria-label="Close modal"
                icon={<CloseIcon fontSize={10} />}
              />
            </HStack>
            <Input
              border="0"
              h="input"
              marginTop="24px"
              opacity={0.3}
              _focus={{
                opacity: 1,
              }}
              placeholder="Search name or paste address"
              bg="modal.input"
            />
          </ModalHeader>
          <ModalBody overflowY="scroll" maxH="60vh" px="0px">
            {tokens.map((token, i) => (
              <HStack
                key={token.address}
                px="20px"
                py="10px"
                transitionDuration="100ms"
                borderBottom={i < tokens.length - 1 ? "1px" : ""}
                borderColor={i < tokens.length - 1 ? "modal.border" : ""}
                onClick={() => handleSelect(i)}
                _hover={{
                  background: "modal.hover",
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
                  <Text color="text" fontSize="md">
                    {token.symbol}
                  </Text>
                  <Text color="text" fontSize="xs">
                    {token.name}
                  </Text>
                </VStack>
                <Spacer />
                <Text color="text">
                  {!token.balance || Number.isInteger(token.balance)
                    ? token.balance
                    : token.balance.toFixed(5)}
                </Text>
              </HStack>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
