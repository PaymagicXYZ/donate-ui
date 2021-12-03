import Image from 'next/image';
import Link from "next/link";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { BsClockHistory } from "react-icons/bs";

export default function SummaryCard(props) {
  const {type, title, description, more, icon, href} = props
  return (
    <Center py={6}>
      <Link href={href || '#'}>
        <a>

          <Box
            maxW={'445px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Box
              h={'210px'}
              bg={'purple.500'}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}>
              <Center h="100%">
                <Icon as={BsClockHistory} boxSize={36} color='white' />
              </Center>
            </Box>
            <Stack>
              <Text
                color={'green.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}>
                {type}
              </Text>
              <Heading
                color={useColorModeValue('gray.700', 'white')}
                fontSize={'2xl'}
                fontFamily={'body'}>
                {title}
              </Heading>
              <Text color={'gray.600'}>
                {description}
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                {more}
              </Text>
            </Stack>
          </Box>
        </a>
      </Link>
    </Center>
  );
}