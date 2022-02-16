import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageContainer from "../components/PageContainer/PageContainer";
import { Center, Spinner } from "@chakra-ui/react"


export default function RedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dustsweeper')
  }, [])

  return (
    <PageContainer>
      <Center w="100%" mx="auto">
        <Spinner size="xl" color="purple"/>
      </Center>
    </PageContainer>
  )
}