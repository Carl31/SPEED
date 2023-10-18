"use client";

import { useRouter } from "next/navigation";
import { SearchSVG } from "../components/svgs";

export default function SearchBar() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search");
  };

  return (
    <section id="search">
      <div className="flex justify-center items-center my-52 mx-auto">
        <button onClick={handleSearchClick}>
          <span className="font-mono bg-blue-800 text-white font-bold rounded-pill inline-flex justify-center items-center px-6 py-2">
            <span className="px-4">
              <SearchSVG />
            </span>
            <p className="text-center text-xl pr-6 overflow-ellipsis whitespace-nowrap">
              Click to search SPEED
            </p>
          </span>
        </button>
      </div>
    </section>
  );
}
