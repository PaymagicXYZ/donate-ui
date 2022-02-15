import { useEffect, useState, useMemo } from "react";
import _ from 'lodash';
import {
  Button,
  Box,
  Center,
  Stack,
  StackProps,
  Link,
  Text,
  Image,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  VStack,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,


  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FiSend, FiToggleLeft } from "react-icons/fi";
import BalanceTable from './Table'
import { WalletChecker } from "../../components/WalletChecker";
import { useCovalent } from "../../hooks/useCovalent";
import { useWeb3React } from "@web3-react/core";
import { VerticalSteps } from "./VerticalSteps"


export default function SubmitApprovalsForm(props) {
  const { library, account, chainId } = useWeb3React();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [tokenApprovals, setTokenApprovals] = useState([]);

  const fetchCovalentData = useCovalent(
    // '0x869eC00FA1DC112917c781942Cc01c68521c415e',
    // 1
    account,
    chainId
  );
  const balances = useMemo(() => {
    const items = _.get(fetchCovalentData, 'balance.data.items', [])
    const validBalances = _.filter(
      items, (i) => {
        return i.quote > 5;
      }
    );

    return validBalances;
  }, [fetchCovalentData]);

  function handleSelectedIndicesChange(newValue) {
    setSelectedIndices(newValue)

    let tmpTokenApprovals = []
    newValue.map( (x,i) => {
      if(selectedIndices[i]) {
        tmpTokenApprovals.push(balances[i])
      }
    })
    setTokenApprovals(tmpTokenApprovals)
  }

  return (
    <WalletChecker loading={fetchCovalentData.loading} account={account}>
      <Center>
        <VStack>
          <BalanceTable
            balances={balances}
            selectedIndices={selectedIndices}
            handleChange={handleSelectedIndicesChange}
          />
          <Button
            size="lg"
            fontWeight="normal"
            colorScheme="purple"
            type="submit"
            value="Submit"
            leftIcon={<FiToggleLeft />}
            isDisabled={isOpen || _.isEmpty(tokenApprovals)}
            isLoading={isOpen}
            loadingText="Sign txs"
            onClick={onOpen}
          >
            Approve Selected Tokens
          </Button>
        </VStack>
      </Center>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve Tokens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VerticalSteps
            tokenApprovals={tokenApprovals}
          />
          </ModalBody>
        </ModalContent>
      </Modal>

    </WalletChecker>
  );
}
