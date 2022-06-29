import React from 'react'
import { Container, Heading, Image } from '@chakra-ui/react'
import LayoutTwo from './LayoutTwo'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'
import Lottie from 'react-lottie'
import t1 from '../assets/lottie/CRO_Dashboard_2.json'


export default function Faq() {
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
            <Box className='faq_main'>
                <Box className='dsbrdanmtnbg'>
                    <Lottie options={top} width={1640} height={2057}></Lottie>
                </Box>
                <Container maxW="container.xl" className='psjn_rltv_aj'>
                    <Box className='faq_prnt'>
                        <Heading as="h3">Frequently Asked Question</Heading>
                    </Box>
                    <Box className='faq_accordians_prnt'>
                        <Accordion defaultIndex={[0]} allowMultiple className='main_accordian'>
                            <AccordionItem className='boedrd_faq'>
                                <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Image src="img/road_map_img01.png" alt='' className='road_map_img_faq'/>
                                        Some about platfrorm and how it works 
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam donec vitae risus ipsum viverra id.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem className='boedrd_faq'>
                                <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Image src="img/road_map_img02.png" alt='' className='road_map_img_faq'/>
                                        Some about platfrorm and how it works 
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam donec vitae risus ipsum viverra id.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam donec vitae risus ipsum viverra id.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem className='boedrd_faq'>
                                <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Image src="img/road_map_img03.png" alt='' className='road_map_img_faq'/>
                                        Some about platfrorm and how it works 
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam donec vitae risus ipsum viverra id.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam donec vitae risus ipsum viverra id.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem className='boedrd_faq'>
                                <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Image src="img/road_map_img04.png" alt='' className='road_map_img_faq'/>
                                        Some about platfrorm and how it works 
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam donec vitae risus ipsum viverra id.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem className='boedrd_faq'>
                                <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Image src="img/road_map_img05.png" alt='' className='road_map_img_faq'/>
                                        Some about platfrorm and how it works 
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam donec vitae risus ipsum viverra id.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam donec vitae risus ipsum viverra id.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem className='boedrd_faq'>
                                <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Image src="img/road_map_img06.png" alt='' className='road_map_img_faq'/>
                                        Some about platfrorm and how it works 
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis condimentum sapien felis, laoreet facilisis sed. Ultricies gravida a, consequat lacus, dictum vitae sit. Sit ut mattis felis ac, praesent nisl justo, volutpat. Ut aliquam
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                </Container>
            </Box>
        </LayoutTwo>
    </>
  )
}
