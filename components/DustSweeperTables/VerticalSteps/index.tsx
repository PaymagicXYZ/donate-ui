import { Box, Stack, Button, Text, HStack, useDisclosure } from '@chakra-ui/react'
import _ from 'lodash';
import { ethers } from "ethers";
import * as React from 'react'
import { Step } from './Step'
import { StepContent } from './StepContent'
import { Steps } from './Steps'
import { useSteps } from './useSteps'
import TokenAmountDisplay from '../../TokenAmountDisplay'
import TokenDisplay from '../../TokenDisplay'

export const VerticalSteps = ({balances, selectedIndices}) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({ initialStep: 0 })

  let tokenApprovals = []
  selectedIndices.map( (x,i) => {
    if(selectedIndices[i]) {
      tokenApprovals.push(balances[i])
    }
  })

  return (
    <Box mx="auto" maxW="2xl" py="10" px={{ base: '6', md: '8' }} minH="400px">
      <Steps activeStep={activeStep}>
        {
          tokenApprovals?.map((x,i) => {
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
                      <Button colorScheme="purple" variant="outline" size="sm" onClick={nextStep}>
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
      <HStack display={activeStep === tokenApprovals.length ? 'flex' : 'none'} mt="10" spacing="4" shouldWrapChildren>
        <Text>✅ All approvals complete</Text>
      </HStack>
    </Box>
  )
}
