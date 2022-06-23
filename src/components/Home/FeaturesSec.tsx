import React from 'react'
import { Box, Container, SimpleGrid, GridItem, Heading, Text, Image } from '@chakra-ui/react'
import { Element } from 'react-scroll';
import { motion, useMotionValue, useTransform } from "framer-motion";


export default function FeaturesSec() {
    const x = useMotionValue(200);
    const y = useMotionValue(200);

    const rotateX = useTransform(y, [0, 400], [15, -15]);
    const rotateY = useTransform(x, [0, 400], [-15, 15]);

    function handleMouse(event:any) {
        const rect = event.currentTarget.getBoundingClientRect();

        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

  return (
    <>
    <Element name='Features'>
        <Box className='feature_main'>
            <Container maxW="container.xl">
                <Box className='featur_max_box'>
                <SimpleGrid columns={12} columnGap={1} rowGap={2} >
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Box className='feature_text_box' data-aos="fade-up" data-aos-delay="300" data-aos-duration="500">
                            <Heading as="h6">New Features</Heading>
                            <Heading as="h3">If you know, you upCRO</Heading>
                            <Text>
                                <b>UpCRO</b> is our first UpToken launched with multiple new features including a drip fault, and a dedicated marketing vault. Our drip vault offers a multi-layered, double auto-compounding staking system with a huge, predictable APY and our marketing vault is funded with a percentage of all trade fees as well as <b>11%</b> of the value raised from our Market Generation Event with verified spends happening regularly. We've also included some cool, new, never before seen functions including the ability to convert any percent of price impact directly into liquidity without affecting the user slippage! Mind blowing!    
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Box className='feature_img_prnt' data-aos="zoom-in" data-aos-delay="500">
                        <motion.div onMouseMove={handleMouse}
                                style={{
                                    display: "flex",
                                    placeItems: "center",
                                    placeContent: "center",
                                    width: "100%",
                                    perspective: 400
                                }}>
                                <motion.div 
                                style={{
                                    width: "100%",
                                    rotateX: rotateX,
                                    rotateY: rotateY
                                }}>
                                    <Box className='radial_gradiant_box'>
                                        <Image src='img/newfeature_img.png' alt='' />
                                    </Box>
                                </motion.div>
                            </motion.div>
                            
                        </Box>
                    </GridItem>
                </SimpleGrid>
                </Box>
            </Container>
        </Box>
    </Element>
    </>
  )
}
