import React
  from 'react'
// import styled, { ThemeContext } from "styled-components"
import { Box, Container } from '@chakra-ui/react'
import LayoutTwo from './LayoutTwo'
import StakingTabs from '../components/Staking/StakingTabs'
import Lottie from 'react-lottie'
import t1 from '../assets/lottie/CRO_Dashboard_2.json'

export default function Staking() {
  const top = {
    loop: true,
    autoplay: true,
    animationData: t1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

  return (
    <>
        <LayoutTwo>
            <Box className='staking_main'>
              <Box className='dsbrdanmtnbg'>
                <Lottie options={top} width={1640} height={2057}></Lottie>
              </Box>
                <Container maxW="container.xl" className='psjn_rltv_aj'>
                    <StakingTabs />
                </Container>
            </Box>
        </LayoutTwo>
    </>
  )
}
