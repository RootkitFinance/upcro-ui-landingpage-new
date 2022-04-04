import React, { useEffect, useState } from 'react'
import { Box, Container, Heading, Text, Button, Image } from '@chakra-ui/react'
import LayoutTwo from './LayoutTwo'
import ReactSelect from 'react-select';
import { SwapService } from '../services/SwapService';
import { useWeb3React } from '@web3-react/core';
import { escapeRegExp, shortenAddress } from '../utils';
import { BASE_ADDRESS, BASE_DECIMALS, ROOTED_ADDRESS, STAKING_ADDRESS } from '../constants';
import { getDisplayBalance } from '../utils/formatBalance';
import BigNumber from 'bignumber.js';
import { TokenService } from '../services/TokenServices';
import { ethers } from "ethers"

const currency = [
    {
        label: 'CRO',
        value: 0,
        image: '/img/upcro_coin_ic.svg'
    }
];
const currencytwo = [
    {
        label: 'upCRO',
        value: 1,
        image: '/img/upcro_coin_ic.svg',
    }
];
  

export default function Swap() {
    const { account, library, chainId } = useWeb3React();
    const [ inputValue, setInputValue] = useState<string>("");
    const [ outputValue, setOutputValue] = useState<string>("");
    const [ currencyInput, setCurrenyInput] = useState<any>(currency);
    const [ currencyOutput, setCurrenyOutput]  = useState<any>(currencytwo);
    const [balance, setBalance] = useState(0)
    const [price, setPrice] = useState("0")
    const [rootedBalance, setRootedBalance] = useState(0)

    const fetchBalance = async () => {
        const balance = await library.getBalance(account!)
        setBalance(balance.toString())      
    }    

    const fetchRootedBalance = async () => {
        const service = new TokenService(library, account!, ROOTED_ADDRESS)
        const balance = await service.getBalance(account!)
        setRootedBalance(balance.toString())      
    }    

    useEffect(() => {
        if (account && library && chainId) {
            fetchBalance()
            fetchRootedBalance()
        }
    }, [account, chainId, library, fetchBalance, setBalance])

    const doSwap = async() => {
        const swapService = new SwapService(library, account!)
        await swapService.swap(inputValue, outputValue, 
            (currencyInput[0].value == 0 ? BASE_ADDRESS : ROOTED_ADDRESS),
            (currencyInput[0].value == 0 ? ROOTED_ADDRESS : BASE_ADDRESS)
        )
    }

    const onInputChange = async(event: React.ChangeEvent<HTMLInputElement>) => {        
        if (!isValid(event.target.value)) return  
        const newValue = event.target.value.replace(/,/g, '.')
        inputChange(newValue, currencyInput[0].value)
    }

    const inputChange = async(newValue: string, currentInputValue: any) => {
        setInputValue(newValue)       
        
        if(newValue != ""){
            const swapService = new SwapService(library, account!)

            if(currentInputValue == 0){
                const amount = await swapService.getAmountOut(newValue)
                const outputVal = ethers.utils.formatEther(amount.toString()).toString()
                const priceData = (parseFloat(outputVal) / parseFloat(newValue)).toFixed(3)
                setOutputValue(parseFloat(outputVal).toFixed(3).toString())
                setPrice(parseFloat(priceData).toFixed(3))
            }
            else{
                const amount = await swapService.getAmountOut2(newValue)
                const outputVal = ethers.utils.formatEther(amount.toString()).toString()
                const priceData = (parseFloat(outputVal) / parseFloat(newValue)).toFixed(8)
                setOutputValue(parseFloat(outputVal).toFixed(8).toString())
                setPrice(parseFloat(priceData).toFixed(8))
            }
        }
        else{
            setOutputValue("")
            setPrice("0")
        }
    }

    const onInputSwap = async() => {
        setOutputValue("")
        if(currencyInput[0].value == 0){
            setCurrenyInput(currencytwo)
            setCurrenyOutput(currency)
            inputChange(outputValue, 1)
        }
        else{
            setCurrenyInput(currency)
            setCurrenyOutput(currencytwo)
            inputChange(outputValue, 0)
        }
    }

    const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
    const isValid = (value: string) => value === '' || inputRegex.test(escapeRegExp(value))

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
                                    <input type="number" value={inputValue} 
                                    onChange={event => onInputChange(event)} />
                                    <Box className='slect_box'>
                                        <ReactSelect
                                            className='select_one'
                                            classNamePrefix="slct"
                                            value={currencyInput[0]}
                                            options={currencyInput}
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
                                    <Text></Text> 
                                    <Text>Balance: {currencyInput != null &&  currencyInput[0].value == 0 ? 
                                    getDisplayBalance(new BigNumber(balance), 4, BASE_DECIMALS) : 
                                    getDisplayBalance(new BigNumber(rootedBalance), 4, BASE_DECIMALS)}</Text>
                                </Box>
                            </Box>
                            <Button className='swap_center_btn' onClick={e => onInputSwap()}><Image src='img/down_arw_ic.svg' /></Button>
                            <Box className='swap_upcro_brdr_bx swap_btc_brdr_bx'>
                                <Box className='flex_bx'>
                                    <input type="number" value={outputValue} 
                                        onChange={event => {
                                        if (!isValid(event.target.value)) return  
                                        const newValue = event.target.value.replace(/,/g, '.')
                                        setOutputValue(newValue)
                                        }} />
                                    <Box className='slect_box'>
                                        <ReactSelect
                                            className='select_one'
                                            classNamePrefix="slct"
                                            value={currencyOutput[0]}
                                            options={currencyOutput}
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
                                    <Text></Text>
                                    <Text>Balance: {currencyInput != null &&  currencyInput[0].value == 1 ? 
                                    getDisplayBalance(new BigNumber(balance), 4, BASE_DECIMALS) : 
                                    getDisplayBalance(new BigNumber(rootedBalance), 4, BASE_DECIMALS)}</Text>
                                </Box>
                            </Box>
                            <Box className='text_row_darc'>
                                <Text>1 {currencyInput[0].label} = {price} {currencyOutput[0].label}</Text>
                                {/* <Text>($0.00065486635)</Text>
                                <Text>Gas: $32.455</Text> */}
                            </Box>
                            <Button className='stake_full_btn' onClick={e => doSwap()}>Swap</Button>
                        </Box>
                    </Box>
                    <Box className='contracts_box'>
                        <Heading as="h4">Contracts</Heading>
                        <Box className='upcro_copyflex'>
                            <Heading as="h6">upCRO<Text>{shortenAddress(ROOTED_ADDRESS)}<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                            <Heading as="h6" className='right_h6'>xUpCRO<Text>{shortenAddress(STAKING_ADDRESS)}<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </LayoutTwo>
    </>
  )
}
