import Image from "next/image";
import TechStack from "@/components/techStack";

export default function Home() {
  return (
    <section id="home" className="mx-auto max-w-4xl py-16 md:px-12 md:py-24">
      <div className="mb-6">
        <h1 className="flex animate-bounce items-center justify-center gap-3 font-extrabold">
          <span className="text-3xl">👋</span> Hey there! I&apos;m Cornelius
        </h1>
      </div>

      <div>
        <Image
          src={"/home/2.png"}
          alt=""
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>

      <p className="text-balance text-gray-600">
        A tech-savvy innovator with expertise in
        <span className="font-medium text-black">
          {" "}
          Web Development, CCTV Security & Networking.
        </span>
      </p>

      <p className="mt-4 text-gray-500">
        I build sleek websites, secure smart spaces, and optimize —all with
        precision and passion!
      </p>

      <div>
        <h3 className="font-bold">Tech Stack</h3>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <TechStack />
        </div>
      </div>
    </section>
  );
}
