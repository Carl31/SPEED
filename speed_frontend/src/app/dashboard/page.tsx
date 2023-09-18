"use server";

import Image from "next/image";
import Dash from "../../components/dash";
import SearchBar from "../../components/searchBar";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  
 let email = undefined;
 let userData = undefined;

  const userSession = await getServerSession(authOptions);
  if (userSession) {
    email = userSession?.user?.email;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/users/email/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    userData = await response.json();
    //console.log("User Data:", userData);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }


  return (
    <>
      {userSession ? (
        <section>
          <Dash userData={userData} />
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
