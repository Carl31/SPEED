"use client"

import React, { useState } from "react";
import { SearchSVG } from "../components/svgs";

export default function SearchBar() {
  // Variable to store what the user searches
  const [userInput, setUserInput] = useState("");

  const handleChange = (value: React.SetStateAction<string>) => {
    setUserInput(value);
    // You can add further logic here to handle the user's input.
  };

  return (
    <section id="search">
      <div className="flex justify-center items-center my-52">
        <span className="font-mono bg-blue-800 text-black font-bold rounded-pill w-65 inline-flex justify-center items-center px-24 py-4">
          <span className="px-4">
            <SearchSVG />
          </span>
          <input
            placeholder="Search for an Article" 
            value={userInput} 
            onChange={(e) => handleChange(e.target.value)}
          />
        </span>
      </div>
    </section>
  );
}