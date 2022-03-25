import React from 'react'
import { Box, SimpleGrid, GridItem, Heading, Text, Button, Image } from '@chakra-ui/react'
import { Element } from 'react-scroll';

export default function FirstSec() {
  return (
    <>
    <Element name='Introduction'>
        <Box className='upcro_launch_main'>
            <Box className='width_full'>
                <SimpleGrid columns={12} columnGap={3} rowGap={2} >
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Box className='launch_text_box'>
                            <Box className='launch_text_box_inn' data-aos="fade-up" data-aos-delay="1000" data-aos-duration="800">
                                <Heading as="h3">upCRO</Heading>
                                <Text>
                                    UpCRO is our most advanced UpToken ever and our first ERC-31337 token on Cronos chain.
                                    <br/>
                                    Paired against CRO; upCRO is the cornerstone vault of the Root Finance upToken ecosystem on Cronos.
                                </Text>
                                <Box className='launch_btns'>
                                    <Button as="a" href='https://cro.empiredex.org/#/swap?outputCurrency=0xb062084aFfDf75b9b494D56B8417F1B981Df790f' target={"_blank"}>BUY NOW</Button>
                                    <Button as="a" href='/dashboard' className='entr_a'>ENTER APP</Button>
                                    <Button as="a" href='https://dexscreener.com/cronos/0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3' target={"_blank"}>CHART</Button>
                                </Box>
                            </Box>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Box className='launch_text_box' data-aos="zoom-in" data-aos-delay="500">
                            <Image src='img/upcro_first_img.jpg' className='upcro_first_img' />
                        </Box>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Box>
    </Element>
    </>
  )
}
