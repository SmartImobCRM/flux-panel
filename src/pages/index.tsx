import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const user = useUser()
  return (
    <>
    {JSON.stringify(user)}
    {hello.data && <div>{hello.data.greeting}</div>}
      <SignInButton />
      <UserButton afterSignOutUrl="/"/>
    </>
  );
};

export default Home;
