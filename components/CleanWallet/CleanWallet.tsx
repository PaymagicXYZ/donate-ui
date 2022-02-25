import { useDisclosure } from "@chakra-ui/react";
import { WalletChecker } from "../WalletChecker";
import { ApprovalForm } from "./ApprovalForm";
import { ApprovalModal } from "./ApprovalModal";
export function CleanWallet(props) {
  const { covalentData, account } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <WalletChecker loading={covalentData.loading} account={account}>
      <ApprovalForm {...{ covalentData, isOpen, onOpen, onClose }} />
      <ApprovalModal {...{ isOpen, onOpen, onClose }} />
    </WalletChecker>
  );
}
