import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import _ from "lodash";
import { Center, Container, Text } from "@chakra-ui/react";
export function ChartContent(props) {
  const { walletData } = props;
  return (
    <Container>
      {_.isEmpty(walletData.assets) ? (
        <Center p={6}>
          <Text as="i">No data found</Text>
        </Center>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={walletData.assets.map((asset) => {
              return {
                name: asset.symbol,
                value: asset.balanceUSD,
              };
            })}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      )}
    </Container>
  );
}
