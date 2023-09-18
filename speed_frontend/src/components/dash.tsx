'use client';

import { UserSVG, MailSVG } from "../components/svgs";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


type Props = {
  userData: User | undefined;
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export default function Dash({ userData }: Props) {
  //console.log(userData);

  return (
    <section id="dash" className="w-full grid grid-cols-3">
      <div className="flex justify-start">
        <button className="m-5">
          <MailSVG />
        </button>
      </div>

      <p className="inline-flex items-center justify-center font-bold text-2xl underline">
        SPEED Dashboard
      </p>

      <div className="flex justify-end">
        <button className="m-5" onClick={ () => signOut() }>
          <UserSVG />
          <p>{userData?.firstName}</p>
        </button>
      </div>
    </section>
  );
}



  // Below is the code for state when saving userdata on client 
  // const [user, setUser] = useState(undefined);

  // console.log("useEffect about to run");
  // useEffect(() => {
  //   console.log("Email:", email);
  //   async function fetchUserData() {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:4000/users/email/${email}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const userData = await response.json().catch((error) => {
  //         console.error("Error parsing JSON data:", error);
  //       });
  //       setUser(userData); // Save the user data to state
  //       console.log("User: "+ user);
  //       console.log(userData);
  //     } catch (error) {
  //       // Handle any errors that occurred during the fetch
  //       console.error("Fetch error:", error);
  //       return null;
  //     }
  //   }
  //   fetchUserData();
  // }); // Empty dependency array ensures this effect runs only once on component mount. For once every mount, simply remove the array altogether.