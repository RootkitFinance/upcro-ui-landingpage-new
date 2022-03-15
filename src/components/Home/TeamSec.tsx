import React from 'react'
import { Box, Container, Heading, SimpleGrid, GridItem, Button, Text, Image } from '@chakra-ui/react'

export default function TeamSec() {
  return (
    <>
        <Box className='team_main'>
            <Container maxW="container.xl">
                <Box className='about_border_box'>
                    <Box className='sadow_box'>
                        <Heading as="h6">Our Team</Heading>
                        <Heading as="h3">Anon with Trusted Reputation</Heading>
                    </Box>
                    <SimpleGrid columns={12} columnGap={4} rowGap={2} >
                        <GridItem colSpan={[12, 12, 12, 6]}>
                            <Box className='team_p_prnt'>
                                <Text>
                                    The <b>ROOT</b> team consists of professor <b>Kronos</b> Kronos and multiple other anonymous members. Our real identities are known to many people and teams and we have been part of the industry since there was only Bitcoin. We believe keeping our privacy is important and our tech and reputation should stand on their own. We're very proud to say we feel were accomplishing this as multiple other teams have now adopted our technology and even found new uses for it or ways to implement it. Some of those learnings are being incorporated in to <b>upCRO</b> and we're happy to have learned from those who adopted and improved what we created.
                                </Text>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={[12, 12, 12, 6]}>
                            <Box className='team_p_prnt team_img_prnt'>
                                <Image src='img/team_img.png' alt='' />
                            </Box>
                        </GridItem>
                    </SimpleGrid>
                    <Button as="a" href="#" >ENTER APP</Button>
                </Box>
            </Container>
        </Box>
    </>
  )
}
