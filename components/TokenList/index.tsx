import { useState, useEffect } from "react";
import _ from "lodash";
import Fuse from "fuse.js";
import { useEthers } from "@usedapp/core";
import {
  useTokenList,
  useLocalCurrency,
  useIsSupportedNetwork,
  UserTokenData,
  LocalCurrencyData,
  useFilteredTokens,
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
  Center,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import Select from "../Select";
import SearchBar from "./SearchBar";

interface Props {
  onSelect: (tokenId: number) => void;
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

  useEffect(() => {
    const formattedTokens = tokens.map((token, i) => ({
      item: token,
      refIndex: i,
    }));
    setFilteredTokens(formattedTokens);
  }, [tokens]);

  useEffect(() => {
    let searchResults = fuse.search(searchTerm);
    if (!searchResults.length && !searchTerm.length) {
      searchResults = tokens.map((token, i) => ({ item: token, refIndex: i }));
    }
    setFilteredTokens(searchResults);
  }, [searchTerm]);

  const handleSelect = (tokenId: number) => {
    onSelect(tokenId);
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
            {filteredTokens.map(({ item, refIndex }) => (
              <HStack
                key={item.address}
                px="20px"
                py="10px"
                transitionDuration="100ms"
                borderBottom={refIndex < filteredTokens.length - 1 ? "1px" : ""}
                borderColor={
                  refIndex < filteredTokens.length - 1 ? "modal.border" : ""
                }
                onClick={() => handleSelect(refIndex)}
                _hover={{
                  background: "modal.hover",
                  cursor: "pointer",
                }}
              >
                <Image
                  marginRight="5px"
                  boxSize="25px"
                  src={item.logoURI}
                  borderRadius="100px"
                  // alt={item.symbol}
                />
                <VStack alignItems="start" spacing="0px">
                  <Text color="text" fontSize="md">
                    {item.symbol}
                  </Text>
                  <Text color="text" fontSize="xs">
                    {item.name}
                  </Text>
                </VStack>
                <Spacer />
                <Text color="text">
                  {!item.balance || Number.isInteger(item.balance)
                    ? item.balance
                    : item.balance.toFixed(5)}
                </Text>
              </HStack>
            ))}
            {filteredTokens.length === 0 && (
              <Center>
                <HStack px="20px" py="10px">
                  <Text>No results found.</Text>
                </HStack>
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
