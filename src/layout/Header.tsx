import React from 'react'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Box as='header' className='header'>
        <Flex
          color={useColorModeValue('gray.600', 'white')}
          align={'center'}
          className="header_inn"
          >
          <Flex
            flex={{ base: 1, lg: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', lg: 'none' }} 
            className="collpse_btn_prnt" >
            <IconButton
              className="collpse_btn"
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5}  />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} className="main_logo_prnt">
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              >
              <NavLink to="/">
                <Image src='img/logo.png' alt='' className='main_logo'/>
              </NavLink>
            </Text>

            <Flex display={{ base: 'none', lg: 'flex' }} ml={10} className="desc_linl_pnt">
              {/* <DesktopNav /> */}
              <Box className='link_prnt'>
                <a href='#'>INTRODUCTION</a>
                <a href='#'>ABOUT</a>
                <a href='#'>TECHNOLOGY</a>
                <a href='#'>FEATURES</a>
                <a href='#'>TEAM</a>
                <NavLink to="/articles">ARTICLE</NavLink>
                <a href='#'>ROADMAP</a>
                <a href='#' className='last_link'>HOW TO BUY</a>
              </Box>
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            className="enterapp_prnt"
            >
            <NavLink
              to="/dashboard"
              className="enterapp_btn"
              >
              ENTER APP
            </NavLink>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity className='nav_callpse'>
          {/* <MobileNav /> */}
          <Box className='mobl_link_prnt'>
            <Box className='link_prnt'>
              <a href='#'>INTRODUCTION</a>
              <a href='#'>ABOUT</a>
              <a href='#'>TECHNOLOGY</a>
              <a href='#'>FEATURES</a>
              <a href='#'>TEAM</a>
              <a href='#'>ARTICLE</a>
              <a href='#'>ROADMAP</a>
              <a href='#' className='last_link'>HOW TO BUY</a>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </>
  )
}
