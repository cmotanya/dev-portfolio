import React from "react";
import Appointment from "../sample";

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

      <Appointment />
    </section>
  );
};

export default Article;
