"use server";

import Image from "next/image";
import Dash from "../../components/dash";
import UserlessDash from "@/components/userlessDash";
import ViewAllPage from "../../components/viewAllPage";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "../../components/userInterface";
import { useEffect, useState } from "react";
import { Article } from "../../components/articlesInterface";
import MailPage from "../../components/mailPage";
import { AnalystArticle } from "../../components/analystArticleInterface"

export default async function Home() {
  let email: string | null | undefined = undefined;
  let userData: User | undefined = undefined;
  let users: User[] = [];
  let articles: Article[] = [];

  const userSession = await getServerSession(authOptions);
  if (userSession) {
    email = userSession?.user?.email;
  }

  try {
    const response = await fetch(`http://localhost:4000/users/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: User = await response.json();
    userData = data;
    //console.log("User Data:", userData);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }

  try {
    const response = await fetch(`http://localhost:4000/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: User[] = await response.json();
    users = data;
    users = users.filter((user) => user.id != userData?.id); // removes currently-signed-in user from users array.
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }

  try {
    const response = await fetch(`http://localhost:4000/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    articles = await response.json();
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }




  let mail: AnalystArticle[] = [];
  try {
    if (userData.role == "user") {
        const res = await fetch(
            `http://localhost:4000/analyst/user/${userData.username}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
          mail = await res.json();
          //console.log("Mail:", userData);
    } else {
        const res = await fetch(
            `http://localhost:4000/analyst`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
          mail = await res.json();
          //console.log("Mail:", userData);
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }

  return (
    <>
      {userSession ? (
        <section>
          <Dash userData={userData} allUsers={users} />
          <MailPage articles={articles} mail={mail} userdata={userData}/>
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
