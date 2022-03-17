import React from 'react'
import { Box, Container, Heading, Text, Button, Image, Select } from '@chakra-ui/react'
import LayoutTwo from './LayoutTwo'
import { components } from 'react-select';
import ReactSelect from 'react-select';

const currency = [
    {
        label: 'upCRO',
        value: 0,
        image: '/img/upcro_coin_ic.svg',
    },
    {
        label: 'upCRO',
        value: 1,
        image: '/img/upcro_coin_ic.svg',
    }
];
const currencytwo = [
{
    label: 'BTC',
    value: 0,
    image: '/img/btc_coin_ic.svg',
},
{
    label: 'BTC',
    value: 1,
    image: '/img/btc_coin_ic.svg',
}
];
  

export default function Swap() {
  return (
    <>
        <LayoutTwo>
            <Box className='swap_main'>
                <Container maxW="container.xl">
                    <Box className='swap_border_Box'>
                        <Heading as="h4">Swap</Heading>
                        <Box className='spwa_cntnt_dark_box'>
                            <Box className='swap_upcro_brdr_bx'>
                                <Box className='flex_bx'>
                                    <input type="number" value="281.594" />
                                    <Box className='slect_box'>
                                        <ReactSelect
                                            className='select_one'
                                            classNamePrefix="slct"
                                            options={currency}
                                            formatOptionLabel={currency => (
                                            <Box className='slect_bg'>
                                            <div className="country-option slect_bg">
                                                <img src={currency.image} alt="country-image" />
                                                <span >{currency.label}</span>
                                            </div>
                                            </Box>
                                            )}
                                        /> 
                                    </Box>
                                </Box>
                                <Box className='flex_bx flex_bx_02'>
                                    <Text>$281.594</Text>
                                    <Text>Balance: 0.00</Text>
                                </Box>
                            </Box>
                            <Box className='swap_upcro_brdr_bx swap_btc_brdr_bx'>
                                <Box className='flex_bx'>
                                    <input type="number" value="281.594" />
                                    <Box className='slect_box'>
                                        <ReactSelect
                                            className='select_one'
                                            classNamePrefix="slct"
                                            options={currencytwo}
                                            formatOptionLabel={currencytwo => (
                                            <div className="country-option slect_bg">
                                                <img src={currencytwo.image} alt="country-image" />
                                                <span>{currencytwo.label}</span>
                                            </div>
                                            )}
                                        /> 
                                    </Box>      
                                </Box>
                                <Box className='flex_bx flex_bx_02'>
                                    <Text>$281.594</Text>
                                    <Text>Balance: 0.00</Text>
                                </Box>
                            </Box>
                            <Box className='text_row_darc'>
                                <Text>1 upCRO = 0.00846454 BTC</Text>
                                <Text>Gas: $32.455</Text>
                                <Text>Gas: $32.455</Text>
                            </Box>
                            <Button className='stake_full_btn'>Stake</Button>
                        </Box>
                    </Box>
                    <Box className='contracts_box'>
                        <Heading as="h4">Contracts</Heading>
                        <Box className='upcro_copyflex'>
                            <Heading as="h6">upCRO<Text>0xb0620........f790f<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                            <Heading as="h6" className='right_h6'>xUpCRO<Text>0x78Bf85......ed90e<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </LayoutTwo>
    </>
  )
}
