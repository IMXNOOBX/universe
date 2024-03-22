import Image from "next/image";
import Layout from "./components/layout";
import Navbar from "./components/navbar"; 
import Intro from "./components/intro";

export default function Home() {
  return (
    <div className="bg-zinc-800 h-screen w-screen px-10 md:px-32">
      <Navbar />
      <main className="opacity-100">
          <Intro />
      </main>
    </div>
  );
}
