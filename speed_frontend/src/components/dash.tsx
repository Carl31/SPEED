"use client";

import { UserSVG, MailSVG } from "../components/svgs";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { User } from "../components/userInterface";

import UserSettings from "../components/settings/user";
import AdministratorSettings from "../components/settings/admin";
import AnalystSettings from "../components/settings/analyst";

type Props = {
  userData: User | undefined;
};

function capitaliseWord(word: string | undefined) {
  if (!word) return word;
  return word[0].toUpperCase() + word.slice(1);
}

export default function Dash({ userData }: Props) {
  //console.log(userData);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <section id="dash" className="w-full grid grid-cols-3">
      {isSettingsOpen && (
        <div className="backdrop-blur absolute inset-0 bg-blue-800 opacity-70" />
      )}
      <div className="flex justify-start">
        <button className="m-5">
          <MailSVG />
        </button>
      </div>

      <p className="inline-flex items-center justify-center font-bold text-2xl underline">
        SPEED Dashboard
      </p>

      <div className="flex justify-end">
        <button className="m-5" onClick={toggleSettings}>
          <UserSVG />
          <p>{userData?.firstName}</p>
        </button>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-1/2 bg-white p-4 rounded shadow-lg flex flex-col justify-between">
            <h2 className="text-2xl font-semibold underline mb-4 text-black flex items-center justify-center">
            {capitaliseWord(userData?.role)} Settings
            </h2>

            <div className="flex-grow">
              {userData?.role === "user" && <UserSettings user = {userData} />}
              {userData?.role === "administrator" && <AdministratorSettings user = {userData}/>}
              {userData?.role === "analyst" && <AnalystSettings user = {userData}/>}
            </div>

            <div className="grid grid-cols-3 mt-14 bg-slate-700 py-3 rounded-2xl">
              <button
                className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-col mx-8 flex items-center justify-center"
                onClick={closeSettings}
              >
                Save
              </button>
              <button
                className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex-col mx-8 flex items-center justify-center"
                onClick={closeSettings}
              >
                Close
              </button>
              <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex-col mx-8 flex items-center justify-center"
                onClick={() =>signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
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
