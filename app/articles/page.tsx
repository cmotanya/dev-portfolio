import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Article = () => {
  return (
    <section id="articles" className="mx-auto max-w-4xl">
      <div className="relative mb-12">
        <h1 className="text-6xl font-bold">
          <span className="text-primary">Articles</span>{" "}
          <span className="relative">
            Me
            <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        <article className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">
            See in the Dark: ColorVu 3.0 CCTV Cameras
          </h2>
          <p className="line-clamp-2 text-gray-700">
            Discover how CCTV cameras with ColorVu 3.0 technology deliver vivid,
            full-color video even in complete darkness. With advanced sensors
            and smart imaging, ColorVu 3.0 ensures critical details are always
            visible, enhancing security for homes and businesses day and night.
          </p>
          <Link
            href="#"
            className="bg-primary hover:bg-primary ring-secondary text-xs-sm flex max-w-fit items-center gap-2 rounded-full p-2 shadow-md ring transition duration-200 ease-in-out hover:-translate-y-1 focus:outline-none active:-translate-y-1"
          >
            Read more
            <ArrowRight size={12} />
          </Link>
        </article>
        {/* Add more articles as needed */}
      </div>
    </section>
  );
};

export default Article;
