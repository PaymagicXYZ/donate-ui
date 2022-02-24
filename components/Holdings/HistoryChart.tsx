import { useEffect, useState, useMemo } from "react";
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
import { Center, Box, Text, Select } from "@chakra-ui/react";
import numeral from "numeral";

export function HistoryChart(props) {
  const { covalentData } = props;
  const [days, setDays] = useState(30);
  const [activeDates, setActiveDates] = useState([]);
  const [totalValue, setTotalValue] = useState([]);
  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return month + "/" + day + "/" + year;
  }
  const dates = [];

  const value = [];
  try {
    covalentData.history.data.items[0].holdings.map((item) => {
      dates.unshift(item.timestamp);
    });
    for (let i = 0; i < 31; i++) {
      let calculatedValue = 0;
      covalentData.history.data.items.forEach((item) => {
        calculatedValue += item.holdings[i].close.quote;
      });
      value.unshift(calculatedValue);
    }
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    if (covalentData.loading == false) {
      setActiveDates(
        dates.slice(dates.length - days).map((date) => {
          return getFormattedDate(new Date(date));
        })
      );
      setTotalValue(value.slice(dates.length - days));
      // .map((value) => `${numeral(value).format("$0,00")}`)
    }
  }, [days, covalentData]);

  return (
    <Box alignItems="center">
      {covalentData.loading ? (
        <Center p={6}>
          <Text as="i">Fetching data</Text>
        </Center>
      ) : _.isEmpty(covalentData.history.data) ? (
        <Center p={6}>
          <Text as="i">No history found</Text>
        </Center>
      ) : (
        <>
          <Text>
            {numeral(totalValue[totalValue.length - 1]).format("$0,00")}
          </Text>
          <AreaChart
            width={500}
            height={400}
            data={activeDates.map((date, i) => {
              return { name: date, value: totalValue[i] };
            })}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
          <Select onChange={(e) => setDays(Number(e.target.value))}>
            <option value={30}>Last 30 Days</option>
            <option value={15}>Last 15 Days</option>
            <option value={7}>Last 7 Days</option>
          </Select>
        </>
      )}
    </Box>
  );
}
