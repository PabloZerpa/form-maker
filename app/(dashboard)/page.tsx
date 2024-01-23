"use client"
import { StatsCards } from "@/components/Stats";
import CreateFormBtn from "@/components/CreateFormBtn";
import FormCards from "@/components/FormCards";
import { Button } from "react-daisyui";
import { useUser } from "@clerk/nextjs";
import { FaDraftingCompass, FaTools } from "react-icons/fa";
import { SiGoogleforms } from "react-icons/si";
import Link from "next/link";

function Home() {
  const { isSignedIn } = useUser();

  if(isSignedIn){
    return (
      <div className="w-full h-32">
  
        <StatsCards />

        <div className="flex flex-col justify-center items-center md:items-start gap-4 mx-12 my-8 ">
          <h2 className="text-2xl font-semibold">Your Forms</h2>
  
          <div className="flex flex-wrap justify-center md:justify-between items-start gap-8 w-full">
            <CreateFormBtn />
            <FormCards />
          </div>
        </div>
  
      </div>
    );
  }
  
  return (
      <div className="relative flex flex-col justify-center items-center w-full h-screen ">

        <FaDraftingCompass className="absolute top-24 left-8 w-24 h-24 text-blue-600/80 animate-pulse hidden md:block" />
        <FaTools className="absolute bottom-24 right-8 w-24 h-24 text-blue-600/80 animate-pulse hidden md:block" />
        <SiGoogleforms className="absolute top-56 right-left-32 w-32 h-24 text-blue-600/80 animate-bounce hidden md:block" />

        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-4xl font-semibold">Welcome to the form maker app!</h2>
          <h3 className="text-4xl font-semibold">Click the button below for start</h3>
          <Button className="w-64 bg-indigo-600 hover:bg-indigo-500 text-zinc-200">
            <Link href={`/builder/`}>Go to builder</Link>
          </Button>
        </div>

      </div>

  )
}

export default Home;