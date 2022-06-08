import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Text,
  Flex,
  Center,
  Spinner,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { TransactionStatus, useEthers } from "@usedapp/core";
import Image from "next/image";
import metamaskLogo from "../../assets/metamask_logo.png";
import walletconnectLogo from "../../assets/walletconnect_logo.png";
import coinbaseLogo from "../../assets/coinbasewallet_logo.png";
import genericLogo from "../../assets/base.png";

import { FC } from "react";
import { TRANSACTION_STATUS } from "../../utils/constants";

interface Props {
  amountToDonate: string;
  tokenSymbol: string;
  isOpen: boolean;
  transactionState: TransactionStatus;
  onClose: () => void;
}

const TransactionModal: FC<Props> = ({
  isOpen,
  onClose,
  amountToDonate,
  tokenSymbol,
  transactionState,
}) => {
  const { library } = useEthers();
  const { status } = transactionState;
  const isPending = status === TRANSACTION_STATUS.pending;
  const isMining = status === TRANSACTION_STATUS.mining;
  const isComplete = status === TRANSACTION_STATUS.success;

  const isMetaMaskWallet = library?.connection.url.includes("metamask");
  const isWalletConnectWallet = library?.connection.url.includes("eip-1193");
  const isCoinbaseWallet = library?.connection.url.includes("coinbase");

  const logo = isMetaMaskWallet
    ? metamaskLogo
    : isWalletConnectWallet
    ? walletconnectLogo
    : isCoinbaseWallet
    ? coinbaseLogo
    : genericLogo;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="modal.active"
        color="text"
        w="390px"
        paddingBottom="24px"
      >
        <ModalHeader py="16px">
          Donate {amountToDonate} {tokenSymbol}
        </ModalHeader>
        <Flex
          bg="modalList.hover"
          borderRadius="networkOption"
          p="16px"
          mx="24px"
          marginBottom="16px"
        >
          <Image src={logo} width={38} height={38} />
          <Center>
            <Text fontWeight="bold" marginLeft="16px">
              {isPending
                ? "Awaiting Approval"
                : isMining
                ? "Processing..."
                : isComplete
                ? "Complete"
                : ""}
            </Text>
          </Center>
          <Spacer />
          <Center>
            {isPending || isMining ? (
              <Spinner />
            ) : isComplete ? (
              <CheckCircleIcon fontSize="23px" color="success" />
            ) : null}
          </Center>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
