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
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClick: (id: number) => void;
  items: ModalListItem[];
}

interface ModalListItem {
  id: number;
  name: string;
  logo: StaticImageData;
}

const ModalList: FC<Props> = ({ isOpen, onClose, onClick, items }) => {
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
        {items.map(({ id, name, logo }) => (
          <Flex
            onClick={() => onClick(id)}
            _hover={{
              cursor: "pointer",
              bg: "#1f1f1f",
            }}
            key={id}
            bg="#272727"
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
          </Flex>
        ))}
      </ModalContent>
    </Modal>
  );
};

export default ModalList;
