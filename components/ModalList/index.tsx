import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  Flex,
  Center,
  Spinner,
  Spacer,
} from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  items: ModalListItem[];
}

interface ModalListItem {
  name: string;
  logo: StaticImageData;
  isLoading?: boolean;
  onClick: () => void;
}

const ModalList: FC<Props> = ({ isOpen, onClose, items, title }) => {
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
          {title}
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
        </ModalHeader>
        {items.map(({ name, logo, onClick, isLoading }) => (
          <Flex
            onClick={onClick}
            _hover={{
              cursor: "pointer",
              bg: "modalList.hover",
            }}
            key={name}
            bg="modalList.active"
            borderRadius="networkOption"
            p="16px"
            mx="24px"
            marginBottom="16px"
          >
            <Image src={logo} width={38} height={38} />
            <Center>
              <Text fontWeight="bold" marginLeft="16px">
                {name}
              </Text>
            </Center>
            <Spacer />
            {isLoading && (
              <Center>
                <Spinner />
              </Center>
            )}
          </Flex>
        ))}
      </ModalContent>
    </Modal>
  );
};

export default ModalList;
