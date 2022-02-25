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

export function ApprovalModal(props) {
  const { isOpen, onOpen, onClose } = props;
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Approve Tokens</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <VerticalSteps tokenApprovals={tokenApprovals} /> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
