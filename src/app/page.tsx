import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";

export default function Home() {
  return (
    <>
      <header className="my-52 flex justify-center items-center flex-col">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Spice up your job search with a dash of
          <Cover>humor</Cover>
          or get <Cover>serious insights</Cover>
          <br />
        </h1>
        <i className="text-center text-gray-600 text-xl font-semibold">
          Spice up your job search with a dash of humor or get serious insights
        </i>
        <div className="flex space-x-5 mt-5">
          <Link href="/roast">
            <Button
              variant="destructive"
              size="lg"
              className="mt-4 group-hover:bg-red-700 transition-colors duration-300"
            >
              Get Roasted 🔥
            </Button>
          </Link>
          <Link href="/review">
            <Button
              variant="default"
              size="lg"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
            >
              Analyze Now 🧐
            </Button>
          </Link>
        </div>
      </header>
      <div className="mt-12 text-center">
        <p className="text-xl font-semibold">
          Don't take yourself too seriously.
        </p>
        <p className="text-lg mt-2">
          Unless you're applying for a job. Then maybe do.
        </p>
      </div> 
    </>
  );
}
