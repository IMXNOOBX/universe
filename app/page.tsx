import Image from "next/image";
import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Intro from "./main/page";
import ScrollTo from "./components/utils/ScrollTo";
import CatFollow from "./components/utils/CatFollow";
import Timeline from "./timeline/page";

export default function Home() {
  return (
    <div className="bg-zinc-800 h-screen px-10 md:px-32">
      <Navbar />
      <main className="flex flex-col gap-y-60">
        {/* <CatFollow /> */}
        <Intro />

        <ScrollTo point={undefined} />

        <Timeline />
      </main>
    </div>
  );
}
