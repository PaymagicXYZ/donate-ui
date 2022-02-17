import { ethers } from "ethers";
import * as React from 'react'
import { Box, Stack, Button, Text, HStack, useDisclosure } from '@chakra-ui/react'
import { FiToggleLeft } from "react-icons/fi";
import _ from 'lodash';
import { Step } from './Step'
import { StepContent } from './StepContent'
import { Steps } from './Steps'
import { useSteps } from './useSteps'
import TokenAmountDisplay from '../../TokenAmountDisplay'
import TokenDisplay from '../../TokenDisplay'
import Transactor from "../../../utils/Transactor";
import ERC20Contract from "../../../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import { useWeb3React } from "@web3-react/core";

export const VerticalSteps = ({tokenApprovals}) => {
  const { library, account, chainId } = useWeb3React();
  const { nextStep, prevStep, reset, activeStep } = useSteps({ initialStep: 0 })
  const DUSTSWEEPER_ADDRESS = '0x869eC00FA1DC112917c781942Cc01c68521c415e'

  console.log(tokenApprovals)

  return (
    <Box mx="auto" maxW="2xl" py="10" px={{ base: '6', md: '8' }} minH="400px">
      <Steps activeStep={activeStep}>
        {
          tokenApprovals?.map((x,i) => {
            let loading = false


            const afterMine = async () => {
              loading = false
              nextStep
            }

            async function handleApproval() {
              console.log("Send Approval Tx");
              loading = true

              const erc20 = new ethers.Contract(
                x.contract_address,
                ERC20Contract.abi,
                library.getSigner(account)
              );

              const amountBN = ethers.BigNumber.from(x.balance)
              const tx = Transactor(library, afterMine);
              tx(
                erc20.approve(
                  DUSTSWEEPER_ADDRESS,
                  amountBN
                )
              );
            }


            return (

              <Step title={`Approve ${x.contract_ticker_symbol}`} key={i}>
                <StepContent>
                  <Stack shouldWrapChildren spacing="4">
                    <HStack spacing="4" shouldWrapChildren>
                      <TokenAmountDisplay
                        amountUsd={x.quote}
                        amountTokens={ethers.utils.formatUnits(
                          x.balance,
                          x.contract_decimals
                        )}
                        symbol={x.contract_ticker_symbol}
                      />
                      <TokenDisplay
                        imageUrl={x.logo_url}
                      />
                      <Button
                        colorScheme="purple"
                        variant="outline"
                        size="sm"
                        onClick={handleApproval}
                        leftIcon={<FiToggleLeft />}
                        loadingText="Sign tx"
                      >
                        Approve
                      </Button>
                    </HStack>
                  </Stack>
                </StepContent>
              </Step>

            )
          })
        }

      </Steps>
      <HStack display={activeStep === tokenApprovals?.length ? 'flex' : 'none'} mt="10" spacing="4" shouldWrapChildren>
        <Text>✅ All approvals complete</Text>
      </HStack>
    </Box>
  )
}
