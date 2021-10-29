import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
} from "@chakra-ui/react";

export default function NavItem({ icon, title, active }) {
  return (
    <Flex mt={30} flexDir="column" marginTop="5.5vh" w="100%" alignItems="left">
      <Menu placement="right">
        <Link
          backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ text: "#ffffff", backgroundColor: "#000000" }}
          // w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "black" : "black"}
                backgroundColor={active ? "#7928CA" : "transparent"}
              />

              {title}
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
