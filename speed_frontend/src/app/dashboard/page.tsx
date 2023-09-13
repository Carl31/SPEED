"use server";

import Image from "next/image";
import Dash from "../../components/dash";
import SearchBar from "../../components/searchBar";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Home() {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/signin?callbackUrl=/dashboard");
  //   },
  // });
  

  const userSession = await getServerSession(authOptions); // then I can get userSession?.user so I can call Mongo for full user data
  if (userSession) {
    //console.log(userSession.user);
  }

  return (
    <>
      {userSession ? (
        <section>
          <Dash user={undefined} />
          <SearchBar />
        </section>
        
      ) : (
        <h1 className="text-5xl">You need to sign in first!</h1>
      )}
    </>

  );
}
