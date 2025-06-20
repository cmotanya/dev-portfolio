"use client";

import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

const NotFoundPage = () => {
  // hide header
  useEffect(() => {
    document.body.classList.add("hide-header");
    return () => {
      document.body.classList.remove("hide-header");
    };
  }, []);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex h-full max-h-[40vh] w-full items-center justify-center">
        <Image
          src="/404.svg"
          alt="404"
          width={200}
          height={200}
          className="mb-4 h-full max-h-[40vh] w-auto object-contain"
        />
      </div>
      <h1 className="text-error mb-4 text-6xl font-extrabold">404</h1>
      <p className="text-secondary-text mb-6 text-center text-xl">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="bg-primary text-background group flex items-center gap-2 rounded-full px-6 py-3 text-lg font-semibold shadow hover:shadow-lg"
      >
        <ArrowLeftCircle
          size={20}
          className="transition-all duration-300 ease-in-out group-hover:-translate-x-1.5 group-active:-translate-x-1.5"
        />
        Go back home
      </Link>
    </section>
  );
};

export default NotFoundPage;
