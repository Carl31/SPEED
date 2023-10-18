"use client";

import { User } from "../userInterface";
import { useState, useEffect } from "react";
import React from "react";
import { DownArrowSVG } from "../svgs";

const jsonData = {
  role: "user",
};

interface Props {
  user: User;
  onUpdateUsers: Function;
  allUsers: User[];
}

// temp data
const userData: User[] = [
  {
    id: "1",
    username: "user1",
    password: "test",
    email: "zzz",
    firstName: "test",
    lastName: "test",
    role: "user",
  },
  {
    id: "2",
    username: "user2",
    password: "test",
    email: "zzz",
    firstName: "test",
    lastName: "test",
    role: "user",
  },
  {
    id: "3",
    username: "user3",
    password: "test",
    email: "zzz",
    firstName: "test",
    lastName: "test",
    role: "user",
  },
];

export default function AdministratorSettings({
  user,
  onUpdateUsers,
  allUsers,
}: Props) {
  const [runEffect, setRunEffect] = useState(false); // for test button
  const [users, setUsers] = useState<User[]>([]); // for storing the users from parent component "dash"
  const [updatedUsers, setUpdatedUsers] = useState<User[]>([]); // for storing updated users only, then sending back to "dash"

  function removeRoleTest() {
    // Sets the runEffect state to true when the button is clicked
    setRunEffect(true);
  }

  // When administrator changes the role of a user, that users information is add/removed/updated to a temporary array of users held in state "updatedUsers"
  const handleRoleChange = (
    e: React.ChangeEvent<HTMLSelectElement>, // the HTML select event to retrieve type of role selected
    userId: string // the userID of the user
  ) => {
    const selectedRole = e.target.value;
    if (selectedRole === "") {
      // If "Select a role" is selected, remove the user from updatedUsers
      setUpdatedUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } else {
      // Check if the user is already in the updatedUsers array
      const userIndex = updatedUsers.findIndex((u) => u.id === userId);

      if (userIndex !== -1) {
        // If the user is in the array, update their role
        const updatedUser = { ...updatedUsers[userIndex], role: selectedRole };
        setUpdatedUsers((prevUsers) => {
          const newUsers = [...prevUsers];
          newUsers[userIndex] = updatedUser;
          return newUsers;
        });
      } else {
        // If the user is not in the array, add a new object without a reference to the users array
        const newUser = allUsers.find((u) => u.id === userId);
        if (newUser) {
          const newUserWithRole = {
            ...newUser, // Copy all properties from newUser
            role: selectedRole, // Update the role property
          };
          setUpdatedUsers((prevUsers) => [...prevUsers, newUserWithRole]);
        }
      }
    }
  };

  useEffect(() => {
    setUsers(userData);
    onUpdateUsers(updatedUsers); // upon any change in updatedUsers, the array is passed to parent component "dash"

    if (runEffect) {
      console.log("button pressed"); // for testing
    }


    //console.log("All Users: "+JSON.stringify( allUsers));

    // try {
    //   fetch("/api/users")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    // } catch (error) {
    //   console.error("Fetch error:", error);
    // }
  }, [runEffect, updatedUsers]);

  return (
    <section>
      <div className="w-full grid grid-cols-2 text-black">
        <div className="mb-4">
          <p className="underline">User Information:</p>
          <div className="ml-4">
            <p>
              User: {user.firstName} {user.lastName}
            </p>
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
      </div>

      <div className="text-black">
        <p className="underline  my-3">User Privilages:</p>

        <div className="grid grid-cols-3 gap-0">
          <div className="bg-gray-200 border cellStyle border-black">
            Username
          </div>
          <div className="bg-gray-200 border cellStyle border-black">
            User Role
          </div>
          <div className="bg-gray-200 border cellStyle border-black">Select New Role</div>

          {allUsers.map((user) => (
            <React.Fragment key={user.id}>
              <div className="border cellStyle border-black">{`${user.username}`}</div>
              <div className="border cellStyle border-black">{`${user.role}`}</div>
              <div className="border cellStyle border-black">
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    id="role"
                    name="role"
                    //value={user.role} // Set the selected value based on user.role
                    onChange={(e) => handleRoleChange(e, user.id)} // Add an onChange handler
                  >
                    <option value=""></option>
                    {user.role !== "user" ? (
                      <option value="user">user</option>
                    ) : null}
                    {user.role !== "administrator" ? (
                      <option value="administrator">administrator</option>
                    ) : null}
                    {user.role !== "analyst" ? (
                      <option value="analyst">analyst</option>
                    ) : null}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <DownArrowSVG />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
