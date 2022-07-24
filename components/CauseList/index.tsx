import { useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";
import CauseCard from "./CauseCard";
import { supabaseClient as supabase } from "../../supabaseClient";

const CauseList = (props) => {
  const [causeList, setCauseList] = useState([]);
  useEffect(() => {
    const fetchAllCauses = async () => {
      const { data, error } = await supabase.from("cause").select();
      setCauseList(data);
    };
    fetchAllCauses();
  }, []);

  return (
    <Grid templateColumns={`repeat(${props.col || 4}, 1fr)`} gap={4} py="50px">
      {causeList.map((cause) => (
        <CauseCard key={cause.id} cause={cause} />
      ))}
    </Grid>
  );
};

export default CauseList;
