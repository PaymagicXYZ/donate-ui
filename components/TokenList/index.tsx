import { useState, useEffect } from "react";
import _ from "lodash";
import Fuse from "fuse.js";
import { useEthers } from "@usedapp/core";
import {
  useTokenList,
  useIsSupportedNetwork,
  UserTokenData,
  LocalCurrencyData,
  useCustomToken,
} from "../../hooks";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  HStack,
  VStack,
  Image,
  Spacer,
  Text,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Select from "../Select";
import SearchBar from "./SearchBar";

interface Props {
  onSelect: (token: UserTokenData) => void;
  selectedToken?: UserTokenData | LocalCurrencyData;
}

export default function TokenList(props: Props) {
  const { onSelect, selectedToken } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isSupportedNetwork = useIsSupportedNetwork();
  const { account } = useEthers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTokens, setFilteredTokens] = useState([]);
  const tokens = useTokenList();
  const fuse = new Fuse(tokens, {
    keys: ["name", "address", "symbol"],
    threshold: 0.1,
  });
  const customToken = useCustomToken(searchTerm);
  const hasNoResults = !customToken && filteredTokens.length === 0;

  useEffect(() => {
    setFilteredTokens(tokens);
  }, [tokens]);

  useEffect(() => {
    let searchResults = fuse.search(searchTerm).map(({ item }) => item);
    if (!searchResults.length && !searchTerm.length) {
      searchResults = tokens;
    }
    setFilteredTokens(searchResults);
  }, [searchTerm]);

  const handleSelect = (token: UserTokenData) => {
    onSelect(token);
    handleClose();
  };
  const handleClose = () => {
    setSearchTerm("");
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
      <Modal isOpen={isOpen} onClose={handleClose} w="modal.width">
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
            <SearchBar setSearchTerm={setSearchTerm} />
          </ModalHeader>
          <ModalBody
            overflowY="scroll"
            maxH="60vh"
            px="0px"
            css={{
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ffffff21",
                borderRadius: "24px",
              },
            }}
          >
            {filteredTokens.map((token, i) => (
              <HStack
                key={token.address}
                px="20px"
                py="10px"
                transitionDuration="100ms"
                borderBottom={i < filteredTokens.length - 1 ? "1px" : ""}
                borderColor={
                  i < filteredTokens.length - 1 ? "modal.border" : ""
                }
                onClick={() => handleSelect(token)}
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
            {!!customToken && !filteredTokens.length && (
              <HStack
                key={customToken.address}
                px="20px"
                py="10px"
                transitionDuration="100ms"
                onClick={() => handleSelect(customToken)}
                _hover={{
                  background: "modal.hover",
                  cursor: "pointer",
                }}
              >
                <Image
                  marginRight="5px"
                  boxSize="25px"
                  src={customToken.logoURI}
                  borderRadius="100px"
                  // alt={customToken.symbol}
                />
                <VStack alignItems="start" spacing="0px">
                  <Text color="text" fontSize="md">
                    {customToken.symbol}
                  </Text>
                  <Text color="text" fontSize="xs">
                    {customToken.name}
                  </Text>
                </VStack>
                <Spacer />
                <Text color="text">
                  {!customToken.balance || Number.isInteger(customToken.balance)
                    ? customToken.balance
                    : customToken.balance.toFixed(5)}
                </Text>
              </HStack>
            )}
            {hasNoResults && (
              <Center>
                <HStack px="20px" py="10px">
                  <Text color="text">No results found.</Text>
                </HStack>
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
