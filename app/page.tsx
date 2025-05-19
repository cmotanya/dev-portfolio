import Image from "next/image";
import TechStack from "@/components/tech-stack";
import { Slide } from "react-awesome-reveal";

export default function Home() {
  return (
    <section id="home" className="mx-auto mt-4 max-w-4xl md:px-12 md:py-24">
      <Slide direction="down" triggerOnce duration={200}>
        <div className="mb-6">
          <h1 className="flex animate-bounce items-center justify-center gap-3 font-medium tracking-wide text-gray-600 md:text-4xl">
            <span className="text-3xl">👋</span> Hey there! I&apos;m Cornelius
          </h1>
        </div>
      </Slide>

      <div className="space-y-4">
        <Image
          src={"/home/2.png"}
          alt=""
          width={200}
          height={200}
          className="mx-auto"
        />

        <p>
          A tech-savvy innovator with expertise in
          <span className="font-medium">
            {" "}
            Web Development, CCTV Security & Networking.
          </span>
        </p>

        <p className="mt-4">
          I build sleek websites, secure smart spaces, and optimize —all with
          precision and passion!
        </p>
      </div>

      <div>
        <h3 className="font-bold">Tech Stack</h3>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <TechStack />
        </div>
      </div>
    </section>
  );
}
