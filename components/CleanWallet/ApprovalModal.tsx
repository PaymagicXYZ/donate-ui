import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { ApproveTokenInSteps } from "./Steps/ApproveTokenInSteps";

export function ApprovalModal(props) {
  const { isOpen, onClose, selectedFlatRows } = props;
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Approve Tokens</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ApproveTokenInSteps {...{ selectedFlatRows, onClose }} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
