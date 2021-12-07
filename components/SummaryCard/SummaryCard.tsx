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

export default function SummaryCard(props) {
  const {key, type, title, description, more, icon, iconColor, backgroundColor, color, href} = props
  return (
    <Center key={key}>
      <Link href={href || '#'}>
        <a style={{height:'100%'}}>
          <Box
            maxW={'445px'}
            w={'full'}
            h={'100%'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'lg'}
            _hover={{ boxShadow: 'xl' }}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Box
              h={'210px'}
              bg={backgroundColor}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}>
              <Center h="100%">
                <Icon as={icon} boxSize={36} color={iconColor} />
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