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
          title="Transactions"
        />
        <CardContent p="6">
          
        </CardContent>
      </Card>
    </PageContainer>
  )
}