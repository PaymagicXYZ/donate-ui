import { useState } from "react";
import { PieChart, Pie, Sector, Tooltip, Treemap } from "recharts";
import _ from "lodash";
import { Center, Box, Text } from "@chakra-ui/react";
import { renderActiveShape } from "./Chart/renderActiveShape";
import { CustomTooltip } from "./Chart/CustomTooltip";

export function ChartContent(props) {
  const { walletData } = props;
  const [activeIndex, setIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setIndex(index);
  };
  const data = walletData.map((asset) => {
    return {
      name: asset.contract_ticker_symbol,
      value: (asset.quote_rate * asset.balance) / 1000000000000000000,
      fill: `rgba(136, 132, ${asset.balance % 255})`,
    };
  });
  return (
    <Box>
      {_.isEmpty(walletData) ? (
        <Center p={6}>
          <Text as="i">No data found</Text>
        </Center>
      ) : (
        <Box>
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
          <Treemap
            width={400}
            height={200}
            data={data}
            dataKey="value"
            stroke="#fff"
            fill="#8884d8"
          >
            <Tooltip
              content={<CustomTooltip active={undefined} payload={undefined} />}
            />
          </Treemap>
        </Box>
      )}
    </Box>
  );
}
