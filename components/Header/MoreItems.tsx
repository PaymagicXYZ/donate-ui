import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { BiInfoCircle, BiBug } from "react-icons/bi";
import { SiDiscord, SiTwitter } from "react-icons/si";
import { Language } from "./Language";

export const MoreItems = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="More"
        icon={<BsThreeDots />}
        backgroundColor="purple.100"
        borderRadius="xl"
        direction="rtl"
        _hover={{
          bg: "purple.400",
        }}
        _active={{
          bg: "purple.400",
        }}
      />
      <MenuList borderRadius="xl">
        <Language />
        <MenuItem
          as="a"
          href="https://launch.mirror.xyz/EwldfOSzRyv2uwOg8hCctXdvfps4LygGZnIR2j_mrJk"
          target="_blank"
          icon={<BiInfoCircle size="18" />}
        >
          About
        </MenuItem>
        <MenuItem
          as="a"
          href="https://airtable.com/shrL21KLg8NQHuDWH"
          target="_blank"
          icon={<BiBug size="18" />}
        >
          Report Bugs or Feedback
        </MenuItem>
        <MenuItem
          as="a"
          href="https://discord.gg/CjeeqMeAGc"
          target="_blank"
          icon={<SiDiscord size="18" />}
        >
          Discord
        </MenuItem>
        <MenuItem
          as="a"
          href="https://twitter.com/DustSweeperDAO"
          target="_blank"
          icon={<SiTwitter size="18" />}
        >
          Twitter
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
