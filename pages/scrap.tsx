<Box w={["97%", "90%", "70%"]} mx="auto">
<VStack mt="8" mb="3">
  <Heading as="h3" size="md">
    {t("title")}
  </Heading>
  <Text size="md">{t("subtitle")}</Text>
  <VStack mt="8">
    <Heading as="h5" size="sm" mt="8">
      {t("howToUse")}
    </Heading>
    <OrderedList>
      <ListItem fontSize="md">{t("description.part1")}</ListItem>
      <ListItem fontSize="md">{t("description.part2")}</ListItem>
      <ListItem fontSize="md">{t("description.part3")}</ListItem>
    </OrderedList>
  </VStack>
</VStack>
<Tabs
  isLazy
  index={new RegExp("^[0-2]$").test(tab) ? tab : 0}
  variant="soft-rounded"
  colorScheme="purple"
  mt="8"
  onChange={handleTabsChange}
>
  <Center>
    <TabList>
      <Tab>{t("clean.title")}</Tab>
      <Tab>{t("order.title")}</Tab>
      <Tab>{t("faq.title")}</Tab>
      {/* <Tab>Dashboard</Tab> */}
    </TabList>
  </Center>
  <TabPanels>
    <TabPanel>
      <CleanWallet {...{ account, covalentData }} />
    </TabPanel>
    <TabPanel>
      <ApprovalTable toggle={true} {...{ account, covalentData }} />
    </TabPanel>
    <TabPanel>
      <FAQ />
    </TabPanel>
    {/* <TabPanel>
      <Dashboard {...{ account, covalentData }} />
    </TabPanel> */}
  </TabPanels>
</Tabs>
{false && <ModalWarning />}
</Box>