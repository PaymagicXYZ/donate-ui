import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import _ from "lodash";
import { Center, Container, Text, Select } from "@chakra-ui/react";

export function HistoryChart(props) {
  const { covalentData } = props;
  const [days, setDays] = useState(30);
  const [activeDates, setActiveDates] = useState([]);
  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return month + "/" + day + "/" + year;
  }
  const dates = [];
  covalentData.history.items[0].holdings.map((item) => {
    const D = new Date(item.timestamp);
    dates.unshift(getFormattedDate(D));
  });
  // const data = covalentData.history.items.map((item) => {
  //   return {
  //     name: asset.symbol,
  //     value: asset.balanceUSD,
  //   };
  // });
  useEffect(() => {
    setActiveDates(dates.slice(dates.length - days));
  }, [days]);

  return (
    <Container>
      <Select onChange={(e) => setDays(Number(e.target.value))}>
        <option value={30} selected>
          Last 30 Days
        </option>
        <option value={15}>Last 15 Days</option>
        <option value={7}>Last 7 Days</option>
      </Select>
      {covalentData.loading ? (
        <Center p={6}>
          <Text as="i">Fetching data</Text>
        </Center>
      ) : _.isEmpty(covalentData.history) ? (
        <Center p={6}>
          <Text as="i">No history found</Text>
        </Center>
      ) : (
        <pre>
          <code>
            {JSON.stringify(
              {
                activeDates,
              },
              null,
              2
            )}
          </code>
        </pre>
        // <ResponsiveContainer width="100%" height="100%">
        //   <AreaChart
        //     width={500}
        //     height={400}
        //     data={data}
        //     margin={{
        //       top: 10,
        //       right: 30,
        //       left: 0,
        //       bottom: 0,
        //     }}
        //   >
        //     <CartesianGrid strokeDasharray="3 3" />
        //     <XAxis dataKey="name" />
        //     <YAxis />
        //     <Tooltip />
        //     <Area
        //       type="monotone"
        //       dataKey="uv"
        //       stroke="#8884d8"
        //       fill="#8884d8"
        //     />
        //   </AreaChart>
        // </ResponsiveContainer>
      )}
    </Container>
  );
}
