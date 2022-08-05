import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import CauseCard from "./CauseCard";
import { supabaseClient as supabase } from "../../supabaseClient";

const CauseList = () => {
  const [causeList, setCauseList] = useState([]);
  useEffect(() => {
    const fetchAllCauses = async () => {
      const { data, error } = await supabase.from("cause").select();
      setCauseList(data);
    };
    fetchAllCauses();
  }, []);
  console.log(causeList);

  return (
    <SimpleGrid gap={4} py="50px" minChildWidth="260px">
      {causeList.map((cause) => (
        <CauseCard key={cause.id} cause={cause} />
      ))}
    </SimpleGrid>
  );
};

export default CauseList;
