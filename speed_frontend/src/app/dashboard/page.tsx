"use server";

import Image from "next/image";
import Dash from "../../components/dash";
import SearchBar from "../../components/searchBar";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default async function Home() {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/signin?callbackUrl=/dashboard");
  //   },
  // });

  //const [session, setSession] = useState(false);
  const userSession = await getServerSession(authOptions);

  //console.log(userSession)
  // useEffect(() => {
  //   if (userSession) {
  //     setSession(true);
  //   }
  // }, []);

  //const userSession = await getServerSession(authOptions); // then I can get userSession?.user so I can call Mongo for full user data
  //if (userSession) {
  //console.log(userSession.user);
  //}

  return (
    <>
      {userSession ? (
        <section>
          <Dash user={undefined} />
          <SearchBar />
        </section>
      ) : (
        <Link legacyBehavior href="/login" passHref>
          <section className="flex flex-col items-center justify-center">
            <h3>
              <p>Please log in first.</p>
            </h3>
            <button className="my-4 font-mono bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32">
              <a>Click here to log in.</a>
            </button>
          </section>
        </Link>
      )}
    </>
  );
}
