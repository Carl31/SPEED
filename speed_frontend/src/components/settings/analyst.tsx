"use client";

import { User } from "../userInterface";
import { useState, useEffect } from "react";

const jsonData = {
  role: "user",
};

interface NavbarProps {
  user: User;
}

export default function AnalystSettings({ user }: NavbarProps) {
  const [runEffect, setRunEffect] = useState(false);

  function removeRoleTest() {
    // Set the runEffect state to true when the button is clicked
    setRunEffect(true);
  }

  useEffect(() => {
    if (runEffect) {
            console.log("button pressed");
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
            Remove Analyst Role
          </button>
        </div>
      </div>
    </section>
  );
}
