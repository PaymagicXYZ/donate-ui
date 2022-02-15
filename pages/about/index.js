import { Box, Button, Text, Link } from '@chakra-ui/react'
import * as React from 'react'
import PageContainer from "../../components/PageContainer/PageContainer";
import { Card } from '../../components/Card/Card'
import { CardContent } from '../../components/Card/CardContent'
import { CardHeader } from '../../components/Card/CardHeader'

export default function About() {
  return (
    <PageContainer>
      <Card maxW="3xl" mx="auto">
        <CardHeader
          title="ℹ️  About"
        />
        <CardContent p="6">
          <Text mt="1">
            DustSweeper cleans our small token balances from your Ethereum wallet and gives you ETH in return! 🧹            
          </Text>
          <br />
          <Text>
            The app was built by the <Link href="https://www.paymagic.xyz/" isExternal>Paymagic</Link> team at ETHDenver 2021. We hope you find the application useful!
          </Text>
          <br />
          <Text>
            To contact, request other tokens, or contribute to the DAO, get in touch via the{" "}
            <Link href="https://t.me/paymagic" isExternal>
              Paymagic Telegram.
            </Link>
          </Text>
          <br />
          <Text>
            Cheers,
          </Text>
          <Text>
            ✨ 💸 ✨ Paymagic Team ✨ 💸 ✨
          </Text>
        </CardContent>
      </Card>
    </PageContainer>
  )
}