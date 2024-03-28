import Intro from "./main/page";
import ScrollTo from "./components/utils/ScrollTo";
import CatFollow from "./components/utils/CatFollow";
import ScreenCheck from "./components/utils/ScreenCheck";
import Timeline from "./timeline/page";

export default function Home() {
  return (
      <main className="flex flex-col gap-y-60">
        {/* <CatFollow /> */}
        <Intro />

        <ScrollTo point={undefined} />

        <Timeline />
      </main>
  );
}
