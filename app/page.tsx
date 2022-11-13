import Link from "next/link";


export default function Home() {
  return (
    <div className="text-center space-y-20 my-32">

      <h1 className="text-7xl font-bold">
        Do meaningful work
      </h1>

      <h2 className="text-5xl leading-snug font-semibold">
        Find a job you love <br /> working for the US Government
      </h2>

      <div className="flex justify-center">
        <Link 
          className="block bg-yellow-300 border-2 border-yellow-400 max-w-fit text-3xl px-6 py-1 rounded-full"
          href={'/search'}
        >
          Start searching
        </Link>
      </div>
    </div>
  );
}
