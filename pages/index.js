import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageContainer from "../components/PageContainer/PageContainer";
import { Center, Spinner } from "@chakra-ui/react"


export default function RedriectPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/payments/disperse')
  }, [])

  return (
    <PageContainer>
      <Center>
        <Spinner size="xl" />
      </Center>
    </PageContainer>
  )
}