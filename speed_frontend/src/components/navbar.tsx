interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <section id="navbar" className="w-full grid grid-cols-3">
      <div className="flex justify-start">
        <span className="font-mono bg-blue-800 text-white font-bold py-2 px-4 rounded-pill w-32 inline-flex justify-center">
          <p className="text-center">SPEED</p>
        </span>
      </div>

      <p className="inline-flex items-center justify-center font-bold text-lg underline">
        {title} Page
      </p>

      <div className="flex justify-end">
        <button className="font-mono bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32">
          Help
        </button>
      </div>
    </section>
  );
}
