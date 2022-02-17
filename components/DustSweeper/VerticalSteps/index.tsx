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
import { DUSTSWEEPER_ADDRESS } from '../../../utils/constants'
import { ApprovalStep } from './ApprovalStep'

export const VerticalSteps = ({tokenApprovals}) => {
  const { library, account, chainId } = useWeb3React();
  const { nextStep, prevStep, reset, activeStep } = useSteps({ initialStep: 0 })

  console.log(tokenApprovals)

  return (
    <Box mx="auto" maxW="2xl" py="10" px={{ base: '6', md: '8' }} minH="400px">
      <Steps activeStep={activeStep}>
        {
          tokenApprovals?.map((x,i) => {
            return (
              <ApprovalStep
                approvalStep={x}
                i={i}
              />
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
