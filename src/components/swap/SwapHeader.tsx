import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { Box, Container, Heading, Text, Button, Image, Modal, Checkbox, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, useDisclosure, FormControl, FormLabel,Switch  } from '@chakra-ui/react'
import { useExpertModeManager, useUserSingleHopOnly, useUserSlippageTolerance, useUserTransactionTTL } from '../../state/user/hooks'
import TransactionSettings from '../TransactionSettings'
import ReactGA from 'react-ga'
import { useToggleSettingsMenu } from '../../state/application/hooks'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.text2};
`

export default function SwapHeader() {
  let old = (
    <StyledSwapHeader className='swap_header_ash'>
      <RowBetween>
        <TYPE.black className='swap_text_as' fontWeight={500}>Swap</TYPE.black>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  )
  const toggle = useToggleSettingsMenu()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const { isOpen: isSettingModalOpen , onOpen: onSettingModalOpen, onClose: onSettingModalClose } = useDisclosure()
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()

  const [ttl, setTtl] = useUserTransactionTTL()

  return (
    <>
    <Button onClick={onSettingModalOpen}
        className="setting_swap_btn"
        >
            <Image
            src='/img/setting_swap_img.svg'
            alt=''
            className='setting_swap_img'
            />
    </Button>
    <Box className='modale_box'>
        <Modal
        isOpen={isSettingModalOpen} onClose={onSettingModalClose} isCentered
        >
            <ModalOverlay 
            />
            <ModalContent
            className='man_box_modal'
            >
            <ModalHeader className='trans_hader'>Transaction Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <TransactionSettings
                  rawSlippage={userSlippageTolerance}
                  setRawSlippage={setUserslippageTolerance}
                  deadline={ttl}
                  setDeadline={setTtl}
                />

                  <br/>
                  <Box className='switch_box margi_btm'>
                      <Text>Toggle Expert Mode</Text>
                      <FormControl display='flex' alignItems='center' className='switch_min'>
                          <FormLabel className='switch_text'>
                              off
                          </FormLabel>
                          <Switch id='email-alerts' className='round_switch' isChecked={expertMode} onChange={() => {
                              toggleExpertMode()
                          }} />
                          <FormLabel className='switch_text'>
                              on
                          </FormLabel>
                      </FormControl>
                  </Box>
                  <Box className='switch_box'>
                      <Text>Disable Multihops</Text>
                      <FormControl display='flex' alignItems='center' className='switch_min'>
                          <FormLabel className='switch_text'>
                              off
                          </FormLabel>
                          <Switch id='email-alerts' className='round_switch' isChecked={singleHopOnly} onChange={() => {
                            ReactGA.event({
                              category: 'Routing',
                              action: singleHopOnly ? 'disable single hop' : 'enable single hop'
                            })
                            setSingleHopOnly(!singleHopOnly)
                          }} />
                          <FormLabel className='switch_text'>
                              on
                          </FormLabel>
                      </FormControl>
                  </Box>
                {/* <Box className='modal_body'>
                        <Heading as="h2">Slippage tolerance</Heading>
                        <Box className='forth_box_nums'>
                        <Box className='cstm_radio'>
                            <input type='radio' name='tollrens' />
                            <Heading as='h6' className='point_smn_won'>
                                0.1%
                            </Heading>
                        </Box>
                        <Box className='cstm_radio'>
                            <input type='radio' name='tollrens'/>
                            <Heading as='h6' className='point_smn_won point_smn_nonas'>
                                0.5%
                            </Heading>
                        </Box>
                        <Box className='cstm_radio'>
                            <input type='radio' name='tollrens' />
                            <Heading as='h6' className='point_smn_won'>
                                1%
                            </Heading>
                        </Box>
                        <Box className='input_any_popup'>
                            <input type='text' value="0.50%" className='nums_color'/>
                        </Box>
                    </Box>
                    <Heading as="h4">Transaction deadline</Heading>
                    <Box className='mint_box'>
                            <input type='text' value="20" className='nums_color'/>
                        <Text>Min</Text>
                    </Box>
                        <Heading as="h1">Transaction deadline</Heading>
                        <Box className='switch_box margi_btm'>
                            <Text>Toggle Expert Mode</Text>
                            <FormControl display='flex' alignItems='center' className='switch_min'>
                                <FormLabel className='switch_text'>
                                    on
                                </FormLabel>
                                <Switch id='email-alerts' className='round_switch' />
                                <FormLabel className='switch_text'>
                                    off
                                </FormLabel>
                            </FormControl>
                        </Box>
                        <Box className='switch_box'>
                            <Text>Disable Multihops</Text>
                            <FormControl display='flex' alignItems='center' className='switch_min'>
                                <FormLabel className='switch_text'>
                                    on
                                </FormLabel>
                                <Switch id='email-alerts' className='round_switch' />
                                <FormLabel className='switch_text'>
                                    off
                                </FormLabel>
                            </FormControl>
                        </Box>
                        
                </Box> */}
            </ModalBody>
            </ModalContent>
        </Modal>
    </Box>
    </>
  )
}
