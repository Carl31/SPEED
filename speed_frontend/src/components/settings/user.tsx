"use client";

import { User } from "../userInterface";
import { useState, useEffect } from "react";

const jsonData = {
  role: "user",
};

interface NavbarProps {
  user: User;
}

export default function UserSettings({ user }: NavbarProps) {
  const [runEffect, setRunEffect] = useState(false);

  function removeRoleTest() {
    // Set the runEffect state to true when the button is clicked
    setRunEffect(true);
  }

  useEffect(() => {
    if (runEffect) {
      fetch(`http://localhost:4000/users/max`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          console.log("Response:", res);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error("Fetch error:", error);
          return null;
        });
    }
  }, [runEffect]);

  return (
    <section className="w-full grid grid-cols-2 text-black">
      <div className="mb-4">
      <p className="underline">User Information:</p>
        <div className="ml-4">
        <p>User: {user.firstName} {user.lastName}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        </div>
        
      </div>

      <div className="justify-end flex">
        <button
          className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex-col mx-8 flex items-center justify-center w-36 h-16"
          onClick={() => removeRoleTest()}
        >
          Test Button
        </button>
      </div>

      <div className="grid grid-rows-1">
        <p className="underline">Role Access:</p>
        <div className="grid grid-cols-1">
          <button className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex-col mx-8 flex items-center justify-center my-3">
            Request Administrator Role
          </button>
          <button className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex-col mx-8 flex items-center justify-center my-3">
            Request Analyst Role
          </button>
        </div>
      </div>
    </section>
  );
}
