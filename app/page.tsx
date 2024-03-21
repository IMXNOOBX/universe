import Image from "next/image";
import Layout from "./components/layout";
import Navbar from "./components/navbar"; 

export default function Home() {
  return (
    <main className="h-screen bg-zinc-800">
      <Layout />
      <Navbar />

    </main>
  );
}
