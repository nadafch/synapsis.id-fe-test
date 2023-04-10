import { Roboto } from "next/font/google";
import Blog from "@/pages/blog/Main";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <main className={roboto.className}>
        <div className="w-full max-h-screen overflow-hidden">
          <Blog />
        </div>
      </main>
    </>
  );
}
