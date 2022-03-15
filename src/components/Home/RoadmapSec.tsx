import React from 'react'
import { Box, Button, Container, Heading, Image, Text } from '@chakra-ui/react'

export default function RoadmapSec() {
  return (
    <>
        <Container maxW="container.xl">
            <Box className='roadmapsec_main'>
                <Box className='roamap_bg' />
                <Box className='sadow_box'>
                    <Heading as="h6">How we move</Heading>
                    <Heading as="h3">Roadmap</Heading>
                </Box>
                <Box className='roadmap_cntnt'>
                    <Box className='road_cntnt_row road_cntnt_row_01'>
                        <Box className='road_map_img_prnt'>
                            <Image src='img/road_map_img01.png' alt='' className='road_map_img0' />
                        </Box>
                        <Box className='road_text_prnt'>
                            <Heading as="h5">Activate Social channels and begin MGE</Heading>
                            <Text>All social channels have been activated. The landing page and app page are live, and the MGE has been activated.</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt'>
                            <Image src='img/road_map_img02.png' alt='' className='road_map_img0' />
                        </Box>
                        <Box className='road_text_prnt'>
                            <Heading as="h5">Upgrade ERC31337 Contracts and add more features</Heading>
                            <Text>Full rewrite of the ERC31337 standard designed for EmpireDex and RootDex is complete. Two new vaults have been added, a Marketing vault and a Drip vault. Lastly a brand new liquidity building function has been added that will be activated later.</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt'>
                            <Image src='img/road_map_img03.png' alt='' className='road_map_img0' />
                        </Box>
                        <Box className='road_text_prnt'>
                            <Heading as="h5">Open MGE for BSC users to join with BNB</Heading>
                            <Text>If you contribute this way, make sure your BSC wallet is also CRO compatible. We recommend using MetaMask if you plan on contributing this way. Once the MGE ends, we lock the liquidity then launch the token. Everyone who participates in the MGE gets the best possible price.</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt'>
                            <Image src='img/road_map_img04.png' alt='' className='road_map_img0' />
                        </Box>
                        <Box className='road_text_prnt'>
                            <Heading as="h5">Token launch with over 10k% staking APY</Heading>
                            <Text>Right when the MGE finishes and the market goes live there will be no circulating tokens so if users want some of the 10k% APY staking rewards they will have to buy from the market. This should create the perfect launch conditions</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt'>
                            <Image src='img/road_map_img05.png' alt='' className='road_map_img0' />
                        </Box>
                        <Box className='road_text_prnt'>
                            <Heading as="h5">Activate Marketing Vault</Heading>
                            <Text>The marketing vault will receive 11.11% of the MGE funds and 20% of all collected trade fees. After initial volitility settles and the APY gets down to a reasonable level we will begin our post launch marketing efforts.</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt'>
                            <Image src='img/road_map_img06.png' alt='' className='road_map_img0' />
                        </Box>
                        <Box className='road_text_prnt'>
                            <Heading as="h5">Activate New Buy-Back Vault</Heading>
                            <Text>Our newest vault, still in development, will have an auto-buy-back feature with customizable paramiters. We will be working closely with our community to choose the vaults buy-back strategies.</Text>
                        </Box>
                    </Box>
                </Box>
                <Box className='enter_roadmap_btn_prnt'>
                    <Button as="a" href='#' className='enter_roadmap_btn'>ENTER APP</Button>
                </Box>
            </Box>
        </Container>   
    </>
  )
}