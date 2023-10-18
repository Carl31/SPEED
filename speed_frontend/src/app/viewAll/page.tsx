"use server";

import Image from "next/image";
import Dash from "../../components/dash";
import UserlessDash from "@/components/userlessDash";
import ViewAllPage from "../../components/viewAllPage";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut} from "next-auth/react";
import { User } from "../../components/userInterface";
import { useEffect, useState } from "react";
import { Article } from "../../components/articlesInterface";

export default async function Home() {
  
 let email: string | null| undefined = undefined;
 let userData: User | undefined = undefined;
 let users: User[] = [];
 let articles: Article[] = [];

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
    
    const data: User = await response.json();
    userData = data;
    //console.log("User Data:", userData);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/users/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const data: User[] = await response.json();
    users = data;
    users = users.filter(user => user.id != userData?.id); // removes currently-signed-in user from users array.
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/articles`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    articles = await response.json();
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    return null;
  }

  // Callback function to update user data
  const onUpdateUsers = (updatedUsers: User[]) => {
    // Update the state with the new user data
    
    
  };

  return ( 
    <>
      {userSession ? (
        <section>
          <Dash userData={userData} allUsers={users} />
          <ViewAllPage articles={articles} />
        </section>
      ) : ( // doesn't requre a user to be signed in to view all articles
        <section>
          <UserlessDash />
          <ViewAllPage articles={articles}/>
        </section>
      )}
    </>
  );
}
