import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  StackProps,
  Link,
  Text,
  Image,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import PageContainer from "../../../components/PageContainer/PageContainer";
import { Card } from "../../../components/Card/Card";
import { HeadingGroup } from "../../../components/Forms/HeadingGroup";
import Topsafes from "../../../components/Safes/Topsafes";

export default function Page() {
  let props;

  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")}>
        <Box mx="auto" w="90%">
          <Card>
            <Topsafes />
          </Card>
        </Box>
      </Box>
    </PageContainer>
  );
}
