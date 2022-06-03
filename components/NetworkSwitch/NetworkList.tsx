import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import { SUPPORTED_NETWORKS } from "../../utils/constants";
import Image from "next/image";
import { useEthers } from "@usedapp/core";

const NetworkList = ({ isOpen, onClose, offlineClick }) => {
  const { switchNetwork, active } = useEthers();
  const getHandler = (chainId: number) => () => {
    active ? switchNetwork(chainId) : offlineClick(chainId);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg="modal.active"
        color="text"
        w="390px"
        paddingBottom="24px"
      >
        <ModalHeader py="16px">
          Select Network
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
        </ModalHeader>
        {Object.entries(SUPPORTED_NETWORKS).map(([chainId, chainInfo]) => (
          <Flex
            onClick={getHandler(+chainId)}
            _hover={{
              cursor: "pointer",
              bg: "#1f1f1f",
            }}
            key={chainId}
            bg="#272727"
            borderRadius="networkOption"
            p="16px"
            mx="24px"
            marginBottom="16px"
          >
            <Image src={chainInfo.logo} width={38} height={38} />
            <Center>
              <Text fontWeight="bold" marginLeft="16px">
                {chainInfo.name}
              </Text>
            </Center>
          </Flex>
        ))}
      </ModalContent>
    </Modal>
  );
};

export default NetworkList;
