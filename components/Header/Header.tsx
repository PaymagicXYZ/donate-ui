import { Box, Center, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from './Logo'
import { Navbar } from './Navbar'
import { NavLink } from './NavLink'
import Wallet from './Wallet'

export const Header = () => (
  <Navbar>
    <Navbar.Brand>
      <Center marginEnd="10">
        <Logo h="6" iconColor={mode('blue.600', 'blue.300')} />
      </Center>
    </Navbar.Brand>
    <Navbar.Links>
      {/*<NavLink>Documentation</NavLink>*/}
    </Navbar.Links>
    <Navbar.Wallet>
      <Wallet />
    </Navbar.Wallet>
  </Navbar>
)
