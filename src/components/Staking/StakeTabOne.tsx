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
import { shortenAddress, supportedChain } from '../../utils'
import { getDisplayBalance, getFullDisplayBalance } from '../../utils/formatBalance';
import { TokenService } from '../../services/TokenServices';
import { PendingContent } from '../Button';
import { ErrorMessage } from '../ErrorMessage';
import TransactionCompletedModal from '../TransactionCompletedModal';
import { escapeRegExp } from '../../utils'

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
    const { account, library, chainId } = useWeb3React();
    const rootedBalance = useTokenBalance(ROOTED_ADDRESS);
    const stakingBalance = useTokenBalance(STAKING_ADDRESS);
    const [action,
        setAction
    ] = useState<Action>(Action.Stake);
    const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));
    const [completedAction, setCompletedAction] = useState("");
    const [pendingAction, setPendingAction] = useState("");
    const [value, setValue] = useState<string>("");
    const [status, setStatus] = useState<StakingStatus>(StakingStatus.None);
    const [rate, setRate] = useState("");
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [error, setError] = useState("");

    useEffect(() => {
        const getRate = async () => {
            if (account && chainId && supportedChain(chainId!)) {
                const stakedPerRooted = await new StakingService(library, account!).getRate();
                setRate(`${action === Action.Stake ? `1 ${ROOTED_TICKER} = ${stakedPerRooted.toFixed(4)} ${STAKING_TICKER}` : `1 ${STAKING_TICKER} = ${(1/stakedPerRooted).toFixed(4)} ${ROOTED_TICKER}`}`);
            }
        }

        getRate();    
        const timer = setInterval(() => getRate(), 30000)
        return () => clearInterval(timer)
    }, [library, account, chainId, action])

    useEffect(() => {
        const getIsApprove = async () => {
            const service = new TokenService(library, account!, ROOTED_ADDRESS);
            const approved = await service.isApproved(STAKING_ADDRESS);
            setIsApproved(approved);
            if(approved) {
                setStatus(StakingStatus.Approved);
            }
        }
        if(account && chainId && supportedChain(chainId!)) {
            getIsApprove();
        }
    }, [library, account, chainId])
    
    useEffect(() => {
        setBalance(action === Action.Stake ? rootedBalance : stakingBalance)
    }, [action, rootedBalance, stakingBalance])

    const stake = async () => {
    const amount = parseFloat(value);
        if (Number.isNaN(amount) || amount <= 0) {
            setError("Enter amount");
            return;
        }
        setError("");

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
                setTransactionHash(receipt.transactionHash);
            }
            else {
                setError("Transaction Failed")
            }
        }
        setStatus(StakingStatus.Staked);
        setValue("");
    }
    catch (e) {
        console.log(e)
        const errorMessage = extractErrorMessage(e);
        if(errorMessage) {
            setError(errorMessage);
        }
        setStatus(StakingStatus.None)
    }
    }

    const approve = async () => {
        try {
            setStatus(StakingStatus.Approving);
            const service = new TokenService(library, account!, ROOTED_ADDRESS);
            const txResponse = await service.approve(STAKING_ADDRESS);
            if (txResponse) {
                const receipt = await txResponse.wait()
                if (receipt?.status === 1) {
                    setTransactionHash(receipt.transactionHash);
                }
                else {
                    setError("Transaction Failed")
                }
            }
            setStatus(StakingStatus.Approved);
            setIsApproved(true);
        }
        catch (e) {
            console.log(e);
            const errorMessage = extractErrorMessage(e);
            if(errorMessage) {
                setError(errorMessage);
            }
            setStatus(StakingStatus.None);
        }
    }

    const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
    const isValid = (value: string) => value === '' || inputRegex.test(escapeRegExp(value))

    console.log('status', status)
    console.log('balance', balance)
    console.log('pending ac', pendingAction)
    console.log('complete',completedAction )
    console.log('complete', stake )
  return (
    <>
        <TransactionCompletedModal title={completedAction} hash={transactionHash} isOpen={status === StakingStatus.Staked} onDismiss={() => setStatus(StakingStatus.None)} />
            
        <Box className='stakone_main'>
            <Heading as="h4" >Staking</Heading>
            {/* <Box className='stake_unstake_cro_btn_prnt'>
                <Button>Staking</Button>
                <Button>Vault Staking</Button>
            </Box> */}
            <Tabs variant='unstyled'>
            <TabList className='tab_btn_prnt'>
                <Box className='tab_border'>
                    <Tab bg={'#0D6EFD'} _selected={{ color: '#FFFFFF', bg: 'transparent' }} className="staktab01" onClick={() => setAction(Action.Stake)} >Stake upCRO</Tab>
                    <Tab bg={'#0D6EFD'} _selected={{ color: '#FFFFFF', bg: 'transparent' }} className="staktab02" onClick={() => setAction(Action.Unstake)} >Unstake xUpCRO</Tab>
                </Box>
            </TabList>
            <TabPanels>
                <TabPanel className='stake_tab_panel01_prnt tbpnl_pdng_bx'>
                    <Box className='stake_tab_panel01'>
                        <Heading as="h6">{rate}</Heading>
                        <Box className='stake_inpt_box'>
                            <Box className='text_row'>
                                <Text>Amount to stake</Text>
                                <Text>Balance: {getDisplayBalance(balance, 2)}</Text>
                            </Box>
                            <Box className='inpt_btn_row'>
                                <input type="number" value={value} 
                                onChange={event => {
                                if (!isValid(event.target.value)) return  
                                const newValue = event.target.value.replace(/,/g, '.')
                                setValue(newValue)
                                }}></input>
                                <Box className='btn_text_prnt'>
                                    <Button onClick={() => setValue(getFullDisplayBalance(balance))}>MAX</Button>
                                    <Text>upCRO</Text>
                                </Box>
                            </Box>
                        </Box>

                        {
                            isApproved ?
                            
                            <Button className='stake_full_btn' disabled={status === StakingStatus.Staking || !supportedChain(chainId)} onClick={stake}>
                                {status === StakingStatus.Staking 
                                ? <PendingContent text={pendingAction}/> 
                                : `Stake`}
                            </Button> : 
                            <Button className='stake_full_btn' onClick={approve} disabled={status === StakingStatus.Approving || !supportedChain(chainId)}>
                                {status === StakingStatus.Approving 
                                    ? <PendingContent text={"Approving..."}/>
                                    : status === StakingStatus.Approved ? "Approved" : "Approve"
                                }
                            </Button>
                        }

                        {error ? <ErrorMessage error={error} /> : null}
                    </Box>
                    <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                        <Button  onClick={() => window.open(`https://cro.empiredex.org/#/swap?inputCurrency=0xb062084aFfDf75b9b494D56B8417F1B981Df790f`, "_blank")?.focus()}>EmpireDEX</Button>
                        <Button  onClick={() => window.open(`https://dexscreener.com/cronos/0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3`, "_blank")?.focus()}>DEXScreener</Button> 
                    </Box>
                </TabPanel>
                <TabPanel className='stake_tab_panel01_prnt stake_tab_panel02_prnt tbpnl_pdng_bx'>
                    <Box className='stake_tab_panel01'>
                        <Heading as="h6">{rate}</Heading>
                        <Box className='stake_inpt_box'>
                            <Box className='text_row'>
                                <Text>Amount to unstake</Text>
                                <Text>Balance: {getDisplayBalance(balance, 2)}</Text>
                            </Box>
                            <Box className='inpt_btn_row'>
                                <input type="number" value={value}
                                onChange={event => {
                                    if (!isValid(event.target.value)) return  
                                    const newValue = event.target.value.replace(/,/g, '.')
                                    setValue(newValue)
                                    }}></input>
                                <Box className='btn_text_prnt'>
                                    <Button onClick={() => {setValue(getFullDisplayBalance(balance))}}>MAX</Button>
                                    <Text>xUpCRO</Text>
                                </Box>
                            </Box>
                        </Box>

                        {
                            isApproved ? 
                            
                            <Button className='stake_full_btn' disabled={status === StakingStatus.Staking || !supportedChain(chainId)} onClick={stake}>
                                {status === StakingStatus.Staking 
                                ? <PendingContent text={pendingAction}/> 
                                : `Unstake`}
                            </Button>

                            : 
                            <Button className='stake_full_btn' onClick={approve} disabled={status === StakingStatus.Approving || !supportedChain(chainId)}>
                                {status === StakingStatus.Approving 
                                    ? <PendingContent text={"Approving..."}/>
                                    : status === StakingStatus.Approved ? "Approved" : "Approve"
                                }
                            </Button>
                        }
                        
                        {error ? <ErrorMessage error={error} /> : null}
                    </Box>
                    <Box className='stake_emp_dex_btns stake_emp_dex_btns02'>
                        <Button  onClick={() => window.open(`https://cro.empiredex.org/#/swap?inputCurrency=0xb062084aFfDf75b9b494D56B8417F1B981Df790f`, "_blank")?.focus()}>EmpireDEX</Button>
                        <Button  onClick={() => window.open(`https://dexscreener.com/cronos/0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3`, "_blank")?.focus()}>DEXScreener</Button> 
                    </Box>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
        <Box className='contracts_box'>
            <Heading as="h4">Contracts</Heading>
            <Box className='upcro_copyflex'>
                <Heading as="h6">upCRO<Text>{shortenAddress(ROOTED_ADDRESS)}<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
                <Heading as="h6" className='right_h6'>xUpCRO<Text>{shortenAddress(STAKING_ADDRESS)}<Button><Image src="img/copy_ic.svg" alt='' /></Button></Text></Heading>
            </Box>
            <Box className='upcro_copyflex'></Box>
        </Box>
    </>
  )
}
