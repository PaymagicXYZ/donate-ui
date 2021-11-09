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
          title="ℹ️ About"
        />
        <CardContent p="6">
          <Text mt="1">
            Paymagic is a payment tool for DAOs and crypto teams. Send batch transfers, airdrops, vesting schedules, streaming payments, and more all from one easy app. 💸✨
          </Text>
          <br />
          <Text>
            The app was inspired by the ideas and creations of projects like Disperse.app, SuperFluid, Sabler, MerkleDrops, and many more. 🙏
          </Text>
          <br />
          <Text>
            🐛 Submit bugs or feature requests{" "}
            <Link href="https://airtable.com/shrpR5auT6RUIOrDC" isExternal>
              here.
            </Link>
          </Text>
          <Text>
            💬 To contact or contribute to the DAO, join on{" "}
            <Link href="https://t.me/paymagic" isExternal>
              Telegram.
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