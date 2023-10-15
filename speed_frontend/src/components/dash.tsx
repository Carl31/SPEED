"use client";

import { UserSVG, MailSVG } from "../components/svgs";
import { signOut, signIn, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { User } from "../components/userInterface";


import UserSettings from "../components/settings/user";
import AdministratorSettings from "../components/settings/admin";
import AnalystSettings from "../components/settings/analyst";
import NewArticle from './articles/new'; 
import Articles from './articles/index'; 

type Props = {
  userData: User | undefined;
  allUsers: User[];
};

function capitaliseWord(word: string | undefined) {
  if (!word) return word;
  return word[0].toUpperCase() + word.slice(1);
}

export default function Dash({ userData, allUsers }: Props) {

  const { data: session } = useSession(); // Get session information using useSession hook
  //console.log(userData);
  const [users, setUsers] = useState<User[]>(allUsers); // initially set the state to the array props from parent page, but later refreshes this in the 'toggleSettings' function

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  // Define state to store the updated user data
  const [updatedUsers, setUpdatedUsers] = useState<User[]>([]);

  // Callback function to update user data
  const onUpdateUsers = (updatedData: User[]) => {
    // Update the state with the new user data
    //console.log(updatedData);
    setUpdatedUsers(updatedData);
  };

  async function toggleSettings() {
    setIsSettingsOpen((prev) => !prev);

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
        allUsers = data.filter(user => user.id != userData?.id); // removes currently-signed-in user from users array.
        setUsers(allUsers);
        //console.log(allUsers);
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
        return null;
      }
    
  };

  function toggleViewArticles() {

  }

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  async function saveSettings() {
    // save all updated users to database
    const results = [];

    for (const user of updatedUsers) {
      try {
        const response = await fetch(
          `http://localhost:4000/users/${user.username}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              role: user.role,
            }),
          }
        );

        const res = await response.json();
        results.push(res);
      } catch (error) {
        console.error(`Error updating user ${user.username}:`, error);
        results.push({ error: error instanceof Error ? error.message : "Unknown error" });
      }
    }
    //console.log(results);

    setIsSettingsOpen(false);
  }

  return (
    <section id="dash" className="w-full grid grid-cols-3">
      {isSettingsOpen && (
        <div className="backdrop-blur absolute inset-0 bg-blue-800 opacity-70" />
      )}
      <div className="flex justify-start">
        <button className="m-5">
          <MailSVG />
        </button>

        {/*Button that allows user to view articles saved in the articles table - redirects them to the articles page*/}
        <div className="flex justify-start">
          <button className="m-5 text-white">
            <h1>View Articles</h1>
              {/* Call article class component */}
          </button>
        </div>

        {/*Button that allows user to submit a new article - redirects them to the new articles page*/}
        <div className="flex justify-start">
          <button className="m-5 text-white">
            <h1>Submit New Article</h1>
              {/* Call new article class component */}
          </button>
        </div>
      </div>

      <p className="inline-flex items-center justify-center text-white font-bold text-2xl underline">
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
              {userData?.role === "user" && <UserSettings user={userData} />}
              {userData?.role === "administrator" && (
                <AdministratorSettings
                  user={userData}
                  onUpdateUsers={onUpdateUsers}
                  allUsers={users}
                />
              )}
              {userData?.role === "analyst" && (
                <AnalystSettings user={userData} />
              )}
            </div>

            <div className="grid grid-cols-3 mt-14 bg-slate-700 py-3 rounded-2xl">
              <button
                className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-col mx-8 flex items-center justify-center"
                onClick={saveSettings}
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
                onClick={() => {

                  // Created session so that user can sign in if need, then once signed in, they can sign out 
                  if (session) {
                    signOut(); 
                  } else {
                    signIn(); 
                  }
                }}
              >
                {session ? "Sign Out" : "Sign In"}
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
