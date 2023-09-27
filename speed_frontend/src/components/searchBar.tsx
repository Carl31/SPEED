import { SearchSVG } from "../components/svgs";

export default function SearchBar() {
  return (
    <section id="search">
      <div className="flex justify-center items-center my-52">
        <span className="font-mono bg-blue-800 text-white font-bold rounded-pill w-32 inline-flex justify-center items-center px-24 py-4">
          <span className="px-4">
            <SearchSVG />
          </span>
          <p className="text-center text-3xl pr-6">SEARCH</p>
        </span>
      </div>
    </section>
  );
}
