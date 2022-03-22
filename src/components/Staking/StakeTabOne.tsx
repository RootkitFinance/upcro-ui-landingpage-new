import React, {useState, useEffect} from 'react'
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import useTokenBalance from "../../hooks/useTokenBalance";
import {  ROOTED_ADDRESS, ROOTED_TICKER, STAKING_ADDRESS, STAKING_TICKER } from "../../constants";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
// import { TokenService } from "../../services/TokenServices";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { StakingService } from "../../services/StakingServices";

enum Action {
    Stake,
    Unstake
}

enum StakingStatus {
    None,
    Approving,
    Approved,
    Staking,
    Staked
}

export default function StakeTabOne() {
    const { account, library } = useWeb3React();
    const rootedBalance = useTokenBalance(ROOTED_ADDRESS);
    const stakingBalance = useTokenBalance(STAKING_ADDRESS);
    const [action,
        // setAction
    ] = useState<Action>(Action.Stake);
    const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));
    const [completedAction, setCompletedAction] = useState("");
    const [pendingAction, setPendingAction] = useState("");
    const [value, setValue] = useState<string>("");
    const [status, setStatus] = useState<StakingStatus>(StakingStatus.None);

    useEffect(() => {
        setBalance(action === Action.Stake ? rootedBalance : stakingBalance)
    }, [action, rootedBalance, stakingBalance])

     const stake = async () => {
        const amount = parseFloat(value);
        if (Number.isNaN(amount) || amount <= 0) {
            // setError("Enter amount");
            return;
        }
        // setError("");

        try {
            setCompletedAction(`${value} ${action === Action.Stake ? ROOTED_TICKER : STAKING_TICKER} ${action === Action.Stake ? "staked" : "unstaked"}`);
            setPendingAction(`${action === Action.Stake ? "Staking" : "Unstaking"}...`);
            setStatus(StakingStatus.Staking);

            const service = new StakingService(library, account!)
            const txResponse = action === Action.Stake 
                ? await service.stake(value) 
                : await service.unstake(value)

            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    // setTransactionHash(receipt.transactionHash);
                }
                else {
                    // setError("Transaction Failed")
                }
            }
            setStatus(StakingStatus.Staked);
            setValue("");
        }
        catch (e) {
            console.log(e)
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                // setError(errorMessage);
            }
            setStatus(StakingStatus.None)
        }
     }
    console.log('status', status)
    console.log('balance', balance)
    console.log('pending ac', pendingAction)
    console.log('complete',completedAction )
    console.log('complete', stake )
  return (
    <>
        <Box className='stakone_main'>
            <Heading as="h4" >Staking</Heading>
            {/* <Box className='stake_unstake_cro_btn_prnt'>
                <Button>Staking</Button>
                <Button>Vault Staking</Button>
            </Box> */}
            <Tabs variant='unstyled'>
            <TabList className='tab_btn_prnt'>
                <Box className='tab_border'>
                    <Tab bg={'#0D6EFD'} _selected={{ color: '#FFFFFF', bg: 'transparent' }} className="staktab01">Stake upCRO</Tab>
                    <Tab bg={'#0D6EFD'} _selected={{ color: '#FFFFFF', bg: 'transparent' }} className="staktab02">Unstake xUpCRO</Tab>
                </Box>
            </TabList>
            <TabPanels>
                <TabPanel className='stake_tab_panel01_prnt'>
                    <Box className='stake_tab_panel01'>
                        <Heading as="h6">1 upCRO = 0.9851 xUpCRO</Heading>
                        <Box className='stake_inpt_box'>
                            <Box className='text_row'>
                                <Text>Amount to stake</Text>
                                <Text>Balance: 0.00</Text>
                            </Box>
                            <Box className='inpt_btn_row'>
                                <input type="number" value="0.0"></input>
                                <Box className='btn_text_prnt'>
                                    <Button>MAX</Button>
                                    <Text>upCRO</Text>
                                </Box>
                            </Box>
                        </Box>
                        <Button className='stake_full_btn'>Stake</Button>
                    </Box>
                    <Box className='stake_emp_dex_btns'>
                        <Button disabled >Stake</Button>
                        <Button>EmpireDEX</Button>
                        <Button>DEXScreener</Button>
                    </Box>
                </TabPanel>
                <TabPanel className='stake_tab_panel01_prnt stake_tab_panel02_prnt'>
                    <Box className='stake_tab_panel01'>
                        <Heading as="h6">1 upCRO = 1.0151 xUpCRO</Heading>
                        <Box className='stake_inpt_box'>
                            <Box className='text_row'>
                                <Text>Amount to unstake</Text>
                                <Text>Balance: 0.00</Text>
                            </Box>
                            <Box className='inpt_btn_row'>
                                <input type="number" value="0.0"></input>
                                <Box className='btn_text_prnt'>
                                    <Button>MAX</Button>
                                    <Text>xUpCRO</Text>
                                </Box>
                            </Box>
                        </Box>
                        <Button className='stake_full_btn'>Unstake</Button>
                    </Box>
                    <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                        <Button>EmpireDEX</Button>
                        <Button>DEXScreener</Button>
                    </Box>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
        <Box className='contracts_box'>
            <Heading as="h4">Contracts</Heading>
            <Box className='upcro_copyflex'>
                <Heading as="h6">upCRO<Text>0xb0620........f790f<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                <Heading as="h6" className='right_h6'>xUpCRO<Text>0x78Bf85......ed90e<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
            </Box>
            <Box className='upcro_copyflex'></Box>
        </Box>
    </>
  )
}
