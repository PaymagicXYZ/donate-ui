import { ethers } from "ethers";
import { useEffect, useState, useMemo } from "react";
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

export const ApprovalStep = ({approvalStep, i}) => {
  const { library, account, chainId } = useWeb3React();
  const { nextStep, prevStep, reset, activeStep } = useSteps({ initialStep: 0 })
  const [loading, setLoading] = useState(false);

  console.log(approvalStep)

	async function handleApproval() {
	  function afterMine() {
      setLoading(false)
	    nextStep
	  }

    setLoading(true)

	  const erc20 = new ethers.Contract(
	    approvalStep.contract_address,
	    ERC20Contract.abi,
	    library.getSigner(account)
	  );

	  const amountBN = ethers.BigNumber.from(approvalStep.balance)
	  const tx = Transactor(library, afterMine);
	  tx(
	    erc20.approve(
	      DUSTSWEEPER_ADDRESS,
	      amountBN
	    )
	  );
	}


  return (
    <Step title={`Approve ${approvalStep.contract_ticker_symbol}`} key={i}>
      <StepContent>
        <Stack shouldWrapChildren spacing="4">
          <HStack spacing="4" shouldWrapChildren>
            <TokenAmountDisplay
              amountUsd={approvalStep.quote}
              amountTokens={ethers.utils.formatUnits(
                approvalStep.balance,
                approvalStep.contract_decimals
              )}
              symbol={approvalStep.contract_ticker_symbol}
            />
            <TokenDisplay
              imageUrl={approvalStep.logo_url}
            />
            <Button
              colorScheme="purple"
              variant="outline"
              size="sm"
              onClick={handleApproval}
              leftIcon={<FiToggleLeft />}
              loadingText="Sign tx"
              isLoading={loading}

            >
              Approve
            </Button>
          </HStack>
        </Stack>
      </StepContent>
    </Step>
  )
}
