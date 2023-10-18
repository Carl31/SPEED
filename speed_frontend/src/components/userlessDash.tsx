"use client";

import { UserSVG, MailSVG } from "../components/svgs";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { User } from "../components/userInterface";

import UserSettings from "../components/settings/user";
import AdministratorSettings from "../components/settings/admin";
import AnalystSettings from "../components/settings/analyst";

import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function UserlessDash() {
  const router = useRouter();
  
  

  

  const handleSearchClick = () => {
    router.push('/search');
  };

  const handleViewAllClick = () => {
    router.push('/viewAll');
  };

  return (
    <section id="dash" className="w-full grid grid-cols-3">
      <div className="flex justify-start">


        {/*Button that allows user to view articles saved in the articles table - redirects them to the articles page*/}
        <div className="">
          <button onClick={handleViewAllClick} className="mt-5 text-white bg-blue-400 hover:bg-blue-600 font-bold py-2 px-4 rounded flex-col flex items-center justify-center w-36 h-14">
            <h1>View Articles</h1>
              {/* Call article class component */}
          </button>
        </div>

        {/*Button that allows user to submit a new article - redirects them to the new articles page*/}
        <div className="">
          <button onClick={handleSearchClick} className="mt-5 text-white bg-blue-400 hover:bg-blue-600 font-bold py-2 px-4 rounded flex-col mx-6 flex items-center justify-center w-44 h-14">
            <h1>Search Articles</h1>
              {/* Call new article class component */}
          </button>
        </div>
      </div>

      <p className="inline-flex items-center justify-center font-bold text-2xl underline">
        SPEED Dashboard
      </p>

      <div className="flex justify-end">
        <Link legacyBehavior href="/login" passHref>
          <section className="flex flex-col items-center justify-center">
            <button className="my-4 font-mono bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32">
              <a>Click here to log in.</a>
            </button>
          </section>
        </Link>
      </div>

    </section>
  );
}

