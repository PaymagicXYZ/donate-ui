import { Text } from "@chakra-ui/react";
import { useIsSignedIn } from "../../hooks";
import CreateEditForm from "./CreateEditForm";
import SignInButton from "../../components/SignInButton";
import Layout from "../../components/Layout";

const CreatePage = () => {
  const isSignedIn = useIsSignedIn();

  return (
    <Layout>
      {isSignedIn ? (
        <CreateEditForm />
      ) : (
        <>
          <Text fontSize="2xl">Sign in to create a cause</Text>
          <SignInButton />
        </>
      )}
    </Layout>
  );
};

export default CreatePage;
