import { useState, useEffect, useContext } from "react";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import {
  Spacer,
  Text,
  List,
  ListItem,
  Tag,
  Spinner,
  Button,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useIsSignedIn } from "../../hooks";
import CreateEditForm from "../create_cause/CreateEditForm";
import SignInButton from "../../components/SignInButton";
import Layout from "../../components/Layout";
import { Router, useRouter } from "next/router";

const CreatePage = () => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(false);
  const isSignedIn = useIsSignedIn();
  const router = useRouter();
  const supabase = useContext(SupabaseContext);
  const fetchUserCauses = async () => {
    setLoading(true);
    const { data: user } = await supabase.from("user").select("id").single();
    const { data } = await supabase
      .from("cause")
      .select("*")
      .eq("user_id", user.id);
    setCauses(data);
    setLoading(false);
  };
  useEffect(() => {
    if (isSignedIn) fetchUserCauses();
  }, [isSignedIn]);
  return (
    <Layout>
      {isSignedIn ? (
        <>
          <Text fontSize="2xl">My Causes</Text>
          {loading && <Spinner />}
          <List>
            {causes.map(({ url }) => (
              <ListItem key={url} my="20px" w="300px">
                <HStack>
                  <Tag>
                    <Link href={`/${url}`}>{url}</Link>
                  </Tag>
                  <Spacer />
                  <Button size="xs" onClick={() => router.push(`/${url}/edit`)}>
                    Edit
                  </Button>
                  <Button color="red.300" size="xs">
                    Delete
                  </Button>
                </HStack>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        // <CreateEditForm />
        <>
          <Text fontSize="2xl">Sign in to view your causes</Text>
          <SignInButton />
        </>
      )}
    </Layout>
  );
};

export default CreatePage;
