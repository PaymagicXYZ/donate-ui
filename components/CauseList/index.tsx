import { useEffect, useState } from "react";
import { Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import CauseCard from "./CauseCard";
import HistorySwitch from "./HistorySwitch";
import { supabaseClient as supabase } from "../../supabaseClient";

const CauseList = () => {
  const [causeList, setCauseList] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllCauses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cause")
        .select()
        .is("completed", showHistory);
      setCauseList(data);
      setLoading(false);
    };
    fetchAllCauses();
  }, [showHistory]);

  return (
    <>
      <HistorySwitch
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />
      <SimpleGrid
        gap={4}
        my="32px"
        minChildWidth="260px"
        overflowY="scroll"
        h="calc(100% - 122px)"
      >
        {loading ? (
          <Flex w="full" justify="center" marginTop="30px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          causeList.map((cause) => <CauseCard key={cause.id} cause={cause} />)
        )}
      </SimpleGrid>
    </>
  );
};

export default CauseList;
