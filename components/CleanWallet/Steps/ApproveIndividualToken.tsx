import { ethers } from "ethers";
import { useEffect, useState, useMemo } from "react";
import { Box, Stack, Button, Link, HStack } from "@chakra-ui/react";
import { FiToggleLeft } from "react-icons/fi";
import numeral from "numeral";
import _ from "lodash";
import { Step } from "./Step";
import { StepContent } from "./StepContent";
import TokenAmountDisplay from "../../TokenAmountDisplay";
import TokenDisplay from "../../TokenDisplay";
import Transactor from "../../../utils/Transactor";
import ERC20Contract from "../../../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import { useWeb3React } from "@web3-react/core";
import { DUSTSWEEPER_ADDRESS } from "../../../utils/constants";

export const ApproveIndividualToken = ({ token, i, nextStep }) => {
  const { library, account, chainId } = useWeb3React();

  const [
    symbol,
    logo,
    contract_address,
    amountUSDApproved,
    amountETHReceived,
    amountTokenApproved,
  ] = [
    token[1].value[0],
    token[1].value[1],
    token[1].value[2],
    token[4].value[0],
    token[5].value[1],
    token[4].value,
  ];
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState("");
  const [error, setError] = useState("");
  function afterMine(result) {
    setLoading(false);
    setError("");
    // console.log(result);
    result.hash ? setSigned(result.hash) : setError(result.message);
  }

  async function handleApproval() {
    setLoading(true);

    const erc20 = new ethers.Contract(
      contract_address,
      ERC20Contract.abi,
      library.getSigner(account)
    );

    const amountBN = ethers.BigNumber.from(amountTokenApproved[1]);
    const tx = Transactor(library, afterMine);
    tx(erc20.approve(DUSTSWEEPER_ADDRESS, amountBN));
  }

  return (
    <Step
      title={`Approve ${symbol} to receive ≈${numeral(amountETHReceived).format(
        "0,00.0000a"
      )} ETH`}
      key={i}
    >
      <StepContent>
        <Stack shouldWrapChildren spacing="4">
          <HStack spacing="4" shouldWrapChildren>
            <TokenAmountDisplay
              amountUsd={amountUSDApproved}
              amountTokens={ethers.utils.formatUnits(
                amountTokenApproved[1],
                amountTokenApproved[2]
              )}
              symbol={symbol}
            />
            <TokenDisplay imageUrl={logo} />
            {!signed ? (
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
            ) : (
              <Button size="sm" onClick={nextStep}>
                Next
              </Button>
            )}
          </HStack>
          {error && <Box color="red.500">{error}</Box>}
          <Link href={`https://etherscan.io/tx/${signed}`}>
            View Transaction
          </Link>
        </Stack>
      </StepContent>
    </Step>
  );
};
